import { Card } from "./card.js";

export class Computer {
  constructor() {
    this.cards = [];
    this.openCards = [];
    this.LastPickedCard = new Card();
    this.myGuess = []; //{number, pos, turnNumber}
    this.guessOfPlayer = []; //{number, pos, turnNumber}를 저장
    this.addedCardPosOfPlayer = []; // player가 뽑고 넣은 위치를 기억
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

    //open 되어 있는 카드로
    for (let i = 0; i < playerCards.length; ++i) {
      if (playerCards[i].open) {
        possibility[i] = [];
        if (Number.isInteger(playerCards[i])) {
          for (const j = 0; j < i; ++i) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility.filter(function (value) {
                return value < playerCards[i].number;
              });
            }
          }
          for (const j = i + 1; j < playerCards.length; ++i) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility.filter(function (value) {
                return value > playerCards[i].number;
              });
            }
          }
        } else {
          for (let j = 0; j < playerCards.length; ++j) {
            if (i === j) continue;

            possibility.filter(function (value) {
              return value < 12;
            });
          }
        }
      }
    }
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

    console.log(this.canWhite);
    console.log(this.canBlack);
  }

  selectBestJockerPos(idx) {}
}
