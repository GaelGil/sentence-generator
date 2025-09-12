export class Generator {
  content: string;
  cleanedContent: string;
  tokenizedContent: string[];
  transition_probs: Record<string, Record<string, number>>;

  // Constructor
  constructor(content: string) {
    this.content = content;
    this.cleanedContent = this.cleanContent();
    this.tokenizedContent = this.cleanedContent.split(" ");
    this.transition_probs = this.initTransitionProbs();
    this.cleanedContent = this.cleanContent();
  }

  // Methods

  cleanContent(): string {
    return this.content.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  initTransitionProbs(): Record<string, Record<string, number>> {
    for (let i = 0; i < this.tokenizedContent.length - 1; i++) {
      let currentWord = this.tokenizedContent[i];
      if (!this.transition_probs.hasOwnProperty(currentWord)) {
        this.transition_probs[currentWord][this.tokenizedContent[i + 1]] = 0;
      } else if (this.transition_probs.hasOwnProperty(currentWord)) {
        this.transition_probs[currentWord][this.tokenizedContent[i + 1]] += 1;
      }
    }
    return this.transition_probs;
  }

  generate(): string {
    return this.content;
  }
}
