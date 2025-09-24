export class Generator {
  content: string; // the original content
  cleanedContent: string; // the cleaned content
  tokenizedContent: string[]; // the tokenized content ie ["hello", "world"]
  transition_probs: Record<string, Record<string, number>>; // the transition probabilities
  cummulativeDistribution: Record<string, Record<string, number>>; // the cummulative distribution of the transition probabilities
  temperature: number; // the temperature

  constructor(content: string, temperature: number = 0.001) {
    this.content = content; // set the content
    this.cleanedContent = content // clean the content
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim();
    this.tokenizedContent = this.cleanedContent.split(" "); // tokenize the content
    this.transition_probs = {}; // initialize the transition probabilitie dictionary
    this.cummulativeDistribution = {}; // initialize the cummulative distribution dictionary
    this.temperature = temperature; // set the temperature
    this.initTransitionProbs(); //
  }

  cleanContent(): string {
    // function to clean the content
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

    // calculate cummulative distribution
    for (const currentWord in this.transition_probs) {
      const nextWordDict = this.transition_probs[currentWord]; // get next word probabilities
      let cumulativeDict: Record<string, number> = {}; // initialize cumulative dictionary
      const nextWords = Object.keys(nextWordDict).sort(); // sort keys for consistent order
      // initialize total for the current dictionaries total ie {"cat": 0.6, "dog": 0.3,"mouse": 0.1 } should equal 1
      let total = 0;
      // loop through next words
      for (const nextWord of nextWords) {
        total += nextWordDict[nextWord]; // add next word probability to total
        cumulativeDict[nextWord] = total; // update the words cumulative distribution ie {"cat": 0.6, "dog": 0.9,"mouse": 1 }
      }
      // update transition probabilities
      this.cummulativeDistribution[currentWord] = cumulativeDict;
    }

    return this.transition_probs;
  }

  generate(length: number): string {
    const outputText: string[] = []; // output text

    const randomIndex: number = Math.floor(
      Math.random() * this.tokenizedContent.length
    ); // get random index
    // get word from random index
    let currentWord: string = this.tokenizedContent[randomIndex];

    let i = 0;
    while (i < length) {
      // add word to output
      outputText.push(currentWord);

      const nextWordCDF = this.cummulativeDistribution[currentWord]; // get next word CDF
      if (!nextWordCDF) break; // no known transitions from this word

      // sample next word
      const r = Math.random(); // random number between 0 and 1
      let sampledWord = ""; // sampled word

      // loop through next word CDF
      for (const [word, cumulative] of Object.entries(nextWordCDF)) {
        // if random number is less than cumulative
        if (r <= cumulative) {
          // sample the word
          sampledWord = word;
          break;
        }
      }

      // Fallback in case something goes wrong
      if (!sampledWord) {
        const fallbackKeys = Object.keys(nextWordCDF);
        sampledWord = fallbackKeys[fallbackKeys.length - 1];
      }

      // update current word
      currentWord = sampledWord;
      // increment i
      i++;
    }

    return outputText.join(" ");
  }
}
