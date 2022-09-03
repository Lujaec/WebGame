import { Card } from "./card.js";

export class Computer {
  constructor(gm) {
    this.gm = gm;
    this.cards = [];
    this.openCards = [];
    this.LastPickedCard = new Card();
    this.myGuess = []; //{지목했던 card객체, number}
    this.guessOfPlayer = []; //{지목했던 card 객체, number}를 저장
    this.addedCardPosOfPlayer = []; // player가 뽑고 넣은 위치를 기억
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

  guess(playerCards) {
    this.initRange();

    const possibility = [];

    for (let i = 0; i < playerCards.length; ++i) {
      if (playerCards[i].color === "white") {
        possibility[i] = [...this.canWhite];
      } else {
        possibility[i] = [...this.canBlack];
      }
    }

    //open 되어 있는 카드로 경우의 수를 줄임
    for (let i = 0; i < playerCards.length; ++i) {
      if (playerCards[i].open) {
        if (Number.isInteger(playerCards[i])) {
          for (let j = 0; j < i; ++i) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter(function (value) {
                value == 12 || value < playerCards[i].number;
              });
            }
          }

          for (const j = i + 1; j < playerCards.length; ++i) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter(function (value) {
                value == 12 || value > playerCards[i].number;
              });
            }
          }
        } else {
          for (let j = 0; j < playerCards.length; ++j) {
            if (i === j) continue;

            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter(function (value) {
                value < 12;
              });
            }
          }
        }
      }
    }

    //이전에 했던 추측을 활용해 경우의 수 줄이기
    for (const item of this.myGuess) {
      if (item.card.number === item.number) continue;

      let idx = 0;
      while (playerCards[idx] != item.card) {
        idx += 1;
      }

      possibility[idx] = possibility[idx].filter(function (value) {
        value != item.number;
      });
    }

    li = possibility.reduce(function (prev, curr) {
      return prev.length < curr.length ? prev : curr;
    });

    for (let i = 0; i < possibility.length; ++i)
      if (possibility[i].length === li.length) {
        this.myGuess.push({ card: playerCards[i], number: possibility[i][0] });
      }

    console.log(this.myGuess);
  }

  initRange() {
    let whiteCardList = [];
    let blackCardList = [];

    for (let i = 0; i < 13; ++i) {
      whiteCardList.push(true);
      blackCardList.push(true);
    }

    for (const item of this.cards) {
      if (item.color === "white")
        if (Number.isInteger(item.number)) whiteCardList[item.number] = false;
        else whiteCardList[12] = false;
      else {
        if (Number.isInteger(item.number)) blackCardList[item.number] = false;
        else blackCardList[12] = false;
      }
    }

    this.canWhite = [];
    this.canBlack = [];

    for (let i = 0; i < whiteCardList.length; ++i) {
      if (whiteCardList[i]) this.canWhite.push(i);
    }

    for (let i = 0; i < blackCardList.length; ++i) {
      if (blackCardList[i]) this.canBlack.push(i);
    }
  }

  selectBestJockerPos(idx) {}
}
