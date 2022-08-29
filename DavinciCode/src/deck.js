import { Card } from "./card.js";

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export class Deck {
  constructor() {
    this.whiteCards = [];
    this.blackCards = [];

    for (let i = 0; i < 13; ++i) {
      this.whiteCards.push(new Card("white", i));
      this.blackCards.push(new Card("black", i));
    }

    this.randomize(this.whiteCards);
    this.randomize(this.blackCards);
  }

  randomize(arr) {
    for (let i = 0; i < arr.length - 1; ++i) {
      const randomNum = random(i, arr.length - 1);

      let tmp = arr[i];
      arr[i] = arr[randomNum];
      arr[randomNum] = tmp;
    }
  }

  pop(color) {
    if (color == "white") {
      return this.whiteCards.pop("white");
    } else {
      return this.blackCards.pop("black");
    }
  }
}
