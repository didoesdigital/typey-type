class Zipper {
  completed: any[];
  current: any[];
  remaining: any[];

  constructor(items: any[]) {
    this.completed = [];
    this.current = items[0];
    this.remaining = items.slice(1);
  }

  getCompleted() {
    return this.completed;
  }
  getCurrent() {
    return this.current;
  }
  getRemaining() {
    return this.remaining;
  }
  visitNext() {
    if (this.remaining.length !== 0) {
      this.completed.push(this.current);
      this.current = this.remaining.shift();
    }
  }
}

export default Zipper;
