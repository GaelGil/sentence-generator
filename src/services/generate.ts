export class Generator {
  content: string;
  cleanedContent: string;
  tokenizedContent: string[];
  transition_probs: Record<string, Record<string, number>>;
  cummulativeDistribution: Record<string, Record<string, number>>;
  temperature: number;

  constructor(content: string, temperature: number = 0.001) {
    this.content = content;
    this.cleanedContent = content
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim();
    this.tokenizedContent = this.cleanedContent.split(" ");
    this.transition_probs = {};
    this.cummulativeDistribution = {};
    this.temperature = temperature;
    this.initTransitionProbs();
  }

  cleanContent(): string {
    return this.content.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  initTransitionProbs(): Record<string, Record<string, number>> {
    // initialize transition probabilities
    for (let i = 0; i < this.tokenizedContent.length - 1; i++) {
      const currentWord = this.tokenizedContent[i];
      const nextWord = this.tokenizedContent[i + 1];

      if (!this.transition_probs[currentWord]) {
        this.transition_probs[currentWord] = {};
      }

      if (!this.transition_probs[currentWord][nextWord]) {
        this.transition_probs[currentWord][nextWord] = 0;
      }

      this.transition_probs[currentWord][nextWord] += 1;
    }

    // apply softmax
    for (const currentWord in this.transition_probs) {
      const normalizedDict: Record<string, number> = {};
      const nextWordDict = this.transition_probs[currentWord];

      let numerator = 0;
      // calculate denominator
      const keys = Object.keys(nextWordDict);
      for (let j = 0; j < keys.length; j++) {
        const word: string = keys[j];
        const wordCount: number = nextWordDict[word];
        numerator += Math.exp(wordCount / this.temperature);
      }

      // calculate normalized probabilities
      for (let j = 0; j < keys.length; j++) {
        const word: string = keys[j];
        const wordCount: number = nextWordDict[word];
        normalizedDict[word] =
          Math.exp(wordCount / this.temperature) / numerator;
      }

      // update transition probabilities
      this.transition_probs[currentWord] = normalizedDict;
    }

    for (const currentWord in this.transition_probs) {
      const nextWordDict = this.transition_probs[currentWord];
      let cumulativeDict: Record<string, number> = {};
      const nextWords = Object.keys(nextWordDict).sort(); // sort keys for consistent order
      let total = 0;
      for (const nextWord of nextWords) {
        total += nextWordDict[nextWord];
        cumulativeDict[nextWord] = total;
      }

      this.cummulativeDistribution[currentWord] = cumulativeDict;
    }

    return this.transition_probs;
  }

  generate(length: number): string {
    const outputText: string[] = [];

    // Pick a random starting word
    const randomIndex: number = Math.floor(
      Math.random() * this.tokenizedContent.length
    );
    let currentWord: string = this.tokenizedContent[randomIndex];

    let i = 0;
    while (i < length) {
      outputText.push(currentWord);

      const nextWordCDF = this.cummulativeDistribution[currentWord];
      if (!nextWordCDF) break; // no known transitions from this word

      // Sample from the CDF
      const r = Math.random(); // random number between 0 and 1
      let sampledWord = "";

      for (const [word, cumulative] of Object.entries(nextWordCDF)) {
        if (r <= cumulative) {
          sampledWord = word;
          break;
        }
      }

      // Fallback in case something goes wrong
      if (!sampledWord) {
        const fallbackKeys = Object.keys(nextWordCDF);
        sampledWord = fallbackKeys[fallbackKeys.length - 1];
      }

      currentWord = sampledWord;
      i++;
    }

    return outputText.join(" ");
  }
}
