class Lesson {
  constructor(phrases) {
    this.completedPhrases = [];
    this.currentPhrase = phrases[0];
    this.remainingPhrases = phrases.slice(1);
  }

  getCompletedPhrases() {
    return this.completedPhrases;
  }
  getCurrentPhrase() {
    return this.currentPhrase;
  }
  getRemainingPhrases() {
    return this.remainingPhrases;
  }
  visitNextPhrase() {
    this.completedPhrases.push(this.currentPhrase);
    this.currentPhrase = this.remainingPhrases.shift();
  }
}

export default Lesson;
