export class Generator {
  content: string;
  cleanedContent: string;
  tokenizedContent: string[];
  transition_probs: Record<string, Record<string, number>>;

  // Constructor
  constructor(content: string) {
    this.content = content;
    this.cleanedContent = content
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim();
    this.tokenizedContent = this.cleanedContent.split(" ");
    this.transition_probs = {};
    this.initTransitionProbs();
  }

  // Methods
  cleanContent(): string {
    return this.content.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  initTransitionProbs(): Record<string, Record<string, number>> {
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
    return this.transition_probs;
  }

  generate(length: number, temperature: number): string {
    let outputText = [];
    const randomIndex: number = Math.floor(
      Math.random() * this.tokenizedContent.length
    );
    let currentWord: string = this.tokenizedContent[randomIndex];
    let i: number = 0;
    while (i < length) {
      outputText.push(currentWord);

      const nextWordDict = this.transition_probs[currentWord];
      if (!nextWordDict) break; // stop if no next words

      // Find the word with max probability
      let maxWord: string = "";
      let maxCount: number = -Infinity;

      const keys = Object.keys(nextWordDict); // all possible next words
      for (let j = 0; j < keys.length; j++) {
        const word: string = keys[j];
        const count: number = nextWordDict[word];
        if (count > maxCount) {
          maxCount = count;
          maxWord = word;
        }
      }

      currentWord = maxWord;

      i++;
    }

    return outputText.join(" ");
  }
}
