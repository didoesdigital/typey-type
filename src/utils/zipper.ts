import type { PresentedMaterial, PresentedMaterialItem } from "../types";

class Zipper {
  completed: PresentedMaterial;
  current: PresentedMaterialItem;
  remaining: PresentedMaterial;

  constructor(items: PresentedMaterial) {
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
    if (this.remaining.length > 0) {
      this.completed.push(this.current);
      // NOTE: we use a non-null assertion here because we've already checked that the array length is greater than 0:
      this.current = this.remaining.shift()!;
      // return true; // Could return true here to indicate successful movement to next element
    }
    // return false; // Could return false here to indicate there are no more elements to visit
  }
}

export default Zipper;
