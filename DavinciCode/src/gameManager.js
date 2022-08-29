import { Player } from "./player.js";
import { Computer } from "./computer.js";
import { Deck } from "./deck.js";

class GameManager {
  constructor() {
    this.player = new Player();
    this.computer = new Computer();
    this.deck = new Deck();
    this.currentTurn = this.computer;
  }

  check(card, submit) {
    if (card.number === submit) {
      card.open = true;
    } else {
      if (this.currentTurn.LastPickedCard !== null)
        this.currentTurn.LastPickedCard.open = true;
    }
  }
}
