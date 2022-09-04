import { Player } from "./player.js";
import { Computer } from "./computer.js";
import { Deck } from "./deck.js";

export class GameManager {
  constructor() {
    this.player = new Player(this);
    this.computer = new Computer(this);
    this.deck = new Deck();
    this.currentTurn = this.computer;

    for (let i = 0; i < 2; ++i) {
      this.computer.cards.push(this.deck.pop("white"));
      this.computer.cards.push(this.deck.pop("black"));
    }

    for (let i = 0; i < this.computer.cards.length; ++i) {
      if (this.computer.cards[i].number === 12)
        this.computer.selectBestJokerPos(i);
    }
  }

  check(card, submit) {
    if (card.number === submit) {
      card.open = true;
    } else {
      if (this.currentTurn.LastPickedCard !== null)
        this.currentTurn.LastPickedCard.open = true;
    }
  }

  static sortCards(cards) {
    cards.sort(function (a, b) {
      const diff = a.number - b.number;

      if (diff != 0) return diff;

      if (a.color === "black") return -1;
      else return 1;
    });
  }

  static removeIcon() {
    const $playerCards = document.querySelector(".player-cards");

    for (const item of $playerCards.children) {
      if (item.nodeName === "I") $playerCards.removeChild(item);
    }
  }

  static renderCards(pCards, cCards) {
    if (pCards) GameManager.sortCards(pCards);
    if (cCards) GameManager.sortCards(cCards);

    const strs = ["player-cards", "computer-cards"];
    const obj = [pCards, cCards];

    for (let i = 0; i < 2; ++i) {
      if (obj[i] == null) continue;
      let img = document.querySelector("." + strs[i]).firstElementChild;

      if (img === null) img = document.createElement("img");

      for (let j = 0; j < obj[i].length; ++j) {
        const color = obj[i][j].color;
        let number = obj[i][j].number;
        let open = obj[i][j].open;
        let openStr = "";

        if (obj[i] === cCards) number = "back";
        else if (!Number.isInteger(number)) number = 12;

        if (open) {
          if (obj[i] == cCards) number = "";
          else openStr = "open";
        }

        img.src = "../images/" + openStr + color[0] + number + ".jpg";
        img = img.nextElementSibling;
      }
    }
  }

  async initGame() {
    const $deckContainer = document.querySelector(".deck");
    const $computerCards = document.querySelector(".computer-cards");

    for (let i = 0; i < 4; ++i) {
      const img = document.createElement("img");
      $computerCards.appendChild(img);
    }

    GameManager.renderCards(this.player.cards, this.computer.cards);

    const sleep = (sec) => {
      return new Promise((resolve) => setTimeout(resolve, sec));
    };

    while (this.player.cards.length != 4) {
      this.player.pick(this.deck);
      await sleep(20);
    }
  }

  gameStart() {
    console.log("gameStart");

    this.player.turn(this.deck);
  }

  showModal() {
    const $computerCards = document.querySelector(".computer-cards");

    $computerCards.onclick = (e) => {
      if (e.target.nodeName != "IMG") return;

      const modal = document.getElementById("modal");
      const closeBtn = modal.querySelector(".close-area");
      const modalContent = modal.querySelector(".content");
      const imgContainer = document.createElement("div");
      const cardColor = e.target.src.includes("bback") ? "black" : "white";
      console.log(modalContent);

      console.log(modalContent.children);
      if (modalContent.children.length == 0)
        modalContent.appendChild(imgContainer);

      closeBtn.onclick = (e) => {
        modalContent.removeChild(modalContent.firstElementChild);
        modal.style.display = "none";

        closeBtn.onClick = null;
      };

      modal.style.display = "flex";

      imgContainer.classList.add("container");

      const canCards = [];
      for (let i = 0; i < 13; ++i) canCards.push(true);

      for (const card of this.computer.cards) {
        if (card.color === cardColor && card.open) {
          const number = card.number;
          if (!Number.isInteger(number)) number = 12;
          canCards[number] = false;
        }
      }
      for (const card of this.player.cards) {
        if (card.color === cardColor) {
          let number = card.number;
          if (!Number.isInteger(number)) number = 12;
          canCards[number] = false;
        }
      }

      for (let i = 0; i < 13; ++i) {
        if (canCards[i]) {
          const img = document.createElement("img");
          img.src = "../images/" + cardColor[0] + i + ".jpg";
          imgContainer.appendChild(img);
        }
      }
    };
  }
}

const gm = new GameManager();

gm.initGame();
