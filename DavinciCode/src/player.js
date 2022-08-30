import { Card } from "./card.js";

export class Player {
  constructor() {
    this.cards = [];
    this.openCards = [];
    this.LastPickedCard = new Card();
  }

  pick(color, deck) {
    const $remainText = document.querySelector("#" + color + "RemainText");
    const remain = $remainText.textContent.split(" ")[2];

    if (remain > 0)
      $remainText.textContent = $remainText.textContent.replace(
        remain,
        remain - 1
      );

    if (color === "white" && deck.whiteCards.length >= 1) {
      this.cards.push(deck.whiteCards.pop("white"));
      this.LastPickedCard = this.cards[this.cards.length - 1];
    } else if (color === "black" && deck.blackCards.length >= 1) {
      this.cards.push(deck.blackCards.pop("black"));
      this.LastPickedCard = this.cards[this.cards.length - 1];
    } else {
      this.LastPickedCard = null;
    }
  }
}
