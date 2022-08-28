function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

class Card {
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

class Deck {
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
      const randomNum = radndom(i, arr.length - 1);

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

class Player {
  constructor() {
    this.cards = [];
    this.openCards = [];
    this.LastPickedCard = new Card();
  }

  pick(color, deck) {
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

class Computer {
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
