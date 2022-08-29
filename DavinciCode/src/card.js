export class Card {
  constructor(c, n) {
    this.color = c;
    this.number = n;
    this.open = false;
  }

  static compare(a, b) {
    if (a.number > b.number) return 1;
    else if (a.number < b.number) return -1;
    else {
      if (a.color === "black") return -1;
      else return 0;
    }
  }
}
