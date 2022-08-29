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

  guess(playerCards, openCardsOfPlayer) {
    this.initRange(openCardsOfPlayer);

    possibility = [];
    for (let i = 0; i < playerCards.length; ++i) {
      if (playerCards[i].color === "white") {
        possibility[i] = [...this.canWhite];
      } else {
        possibility[i] = [...this.canBlack];
      }
    }
  }

  initRange(openCardsOfPlayer) {
    let whiteCardList = [];
    let blackCardList = [];

    for (let i = 0; i < 13; ++i) {
      whiteCardList.push(true);
      blackCardList.push(true);
    }

    for (const item of openCardsOfPlayer) {
      if (item.color === "white")
        if (Number.isInteger(item.number)) whiteCardList[item.number] = false;
        else whiteCardList[12] = false;
      else {
        if (Number.isInteger(item.number)) blackCardList[item.number] = false;
        else blackCardList[12] = false;
      }
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
      if (whiteCardList[i]) canWhite.push(i);
    }

    for (let i = 0; i < blackCardList.length; ++i) {
      if (blackCardList[i]) canBlack.push(i);
    }
  }
}
