import { Card } from "./card.js";
import { GameManager } from "./gameManager.js";

export class Player {
  constructor(gm) {
    this.gm = gm;
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

  choiceJokerPos(idx) {
    const $playerCards = document.querySelector(".player-cards");
    const $jokerSelect = document.querySelector("#jokerSelect");
    const $imgs = [];

    let jockerImg = $playerCards.firstElementChild;
    for (let i = 0; i < idx; ++i) {
      jockerImg = jockerImg.nextElementSibling;
    }

    $jokerSelect.appendChild(jockerImg);

    let $img = $playerCards.firstElementChild;
    console.log(this.cards.length);
    for (let i = 0; i < this.cards.length; ++i) {
      if (i === idx) continue;
      $imgs.push($img);
      $img = $img.nextElementSibling;
    }

    const handle = (e) => {
      if (e.target.nodeName !== "I") return;

      let pos = 0;
      let i = 0;

      for (i = 0; i < $playerCards.children.length; ++i) {
        if (e.target === $playerCards.children[i]) {
          pos = i;
          break;
        }
      }

      console.log(idx);
      if (pos == 0) {
        this.cards[idx].number = this.cards[0].number - 0.25;
      } else if (pos == $playerCards.children.length - 1) {
        this.cards[idx].number =
          this.cards[this.cards.length - 1].number + 0.25;
      } else {
        this.cards[idx].number = this.cards[pos / 2].number - 0.25;
      }

      $playerCards.appendChild(jockerImg);

      GameManager.removeIcon();
      GameManager.renderCards(this.cards, null);

      for (let i = idx; i < this.cards.length; ++i) {
        if (this.cards[i].number === 12) {
          $playerCards.removeEventListener("click", handle);
          this.choiceJokerPos(i, this);
        }
      }

      if (this.cards.length === 4) {
        let flag = true;
        for (const item of this.cards) if (item.number === 12) flag = false;

        if (flag) this.gm.gameStart();
      }
    };

    $playerCards.addEventListener("click", handle);

    for (const item of $imgs) {
      const element = document.createElement("i");
      element.className = "fa-solid fa-caret-down fa-3x trans";
      $playerCards.insertBefore(element, item);
    }

    const element = document.createElement("i");
    element.className = "fa-solid fa-caret-down fa-3x trans";
    $playerCards.appendChild(element);
  }

  guess() {}
}
