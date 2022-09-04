import { Card } from "./card.js";

export class Computer {
  constructor(gm) {
    this.gm = gm;
    this.cards = [];
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

  guess() {
    const playerCards = this.gm.player.cards;
    this.initRange();

    const possibility = [];
    playerCards[0].open = true;
    playerCards[3].open = true;

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
        if (Number.isInteger(playerCards[i].number)) {
          for (let j = 0; j < i; ++j) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter(
                (value) => value == 12 || value < playerCards[i].number
              );
            }
          }

          for (let j = i + 1; j < playerCards.length; ++j) {
            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter(
                (value) => value == 12 || value > playerCards[i].number
              );
            }
          }
        } else {
          for (let j = 0; j < playerCards.length; ++j) {
            if (i === j) continue;

            if (playerCards[j].color === playerCards[i].color) {
              possibility[j] = possibility[j].filter((value) => value < 12);
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

      possibility[idx] = possibility[idx].filter(
        (value) => value != item.number
      );
    }

    let advancedPossibility = [];
    for (let i = 0; i < playerCards.length; ++i)
      advancedPossibility.push(new Set());
    this.bruteforce(0, possibility, [], [], advancedPossibility); // 간추려진 possibility로 완전 탐색을 해봐서 안되는 경우의 수를 줄임

    const li = advancedPossibility.reduce(function (prev, curr, idx) {
      if (playerCards[idx].open) return prev;
      return prev.size < curr.size ? prev : curr;
    }, new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));

    for (let i = 0; i < advancedPossibility.length; ++i)
      if (advancedPossibility[i].size === li.size) {
        this.myGuess.push({
          card: playerCards[i],
          number: [...advancedPossibility[i]][0],
        });
        break;
      }

    const ans = this.myGuess[this.myGuess.length - 1];
    if (
      ans.card.number === ans.number ||
      (!Number.isInteger(ans.card.number) && ans.number === 12)
    ) {
      // 플레이어 카드 공개
    }

    //턴 넘김
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

  selectBestJokerPos(idx) {
    function rangeData() {
      this.min = 0;
      this.max = 12;
    }

    const jokerColor = this.cards[idx].color;
    let arr = new Array(this.cards.length);

    for (let i = 0; i < this.cards.length; ++i) arr[i] = new rangeData();

    for (let i = 0; i < this.cards.length; ++i) {
      if (this.cards[i].open) {
        for (let j = 0; j < i; ++j)
          if (
            this.cards[i].color === "black" ||
            this.cards[j].color === "whtie"
          ) {
            arr[j].max = this.cards[i].number - 1;
          } else {
            arr[j].max = this.cards[i].number;
          }
      }
    }
  }

  bruteforce(
    idx,
    possibility,
    currentBlackCards,
    currentWhiteCards,
    advancedPossibility //set을 원소로 갖는 리스트
  ) {
    const playerCards = this.gm.player.cards;

    if (idx === playerCards.length) {
      for (const item of currentBlackCards) {
        advancedPossibility[item.idx].add(item.number);
      }
      for (const item of currentWhiteCards) {
        advancedPossibility[item.idx].add(item.number);
      }

      return;
    }

    const card = playerCards[idx];

    if (card.open) {
      if (card.color === "black")
        currentBlackCards.push({ number: card.number, idx: idx });
      else currentWhiteCards.push({ number: card.number, idx: idx });
      this.bruteforce(
        idx + 1,
        possibility,
        currentBlackCards,
        currentWhiteCards,
        advancedPossibility
      );
      if (card.color === "black") currentBlackCards.pop();
      else currentWhiteCards.pop();
    } else {
      for (let num of possibility[idx]) {
        let checkCards;
        if (card.color === "black") checkCards = currentBlackCards;
        else checkCards = currentWhiteCards;

        let flag = false;
        for (const item of checkCards) {
          if (item.number === num) {
            flag = true;
            break;
          }
        }
        if (flag) continue;

        checkCards.push({ number: num, idx });
        if (card.color === "black")
          this.bruteforce(
            idx + 1,
            possibility,
            checkCards,
            currentWhiteCards,
            advancedPossibility
          );
        else
          this.bruteforce(
            idx + 1,
            possibility,
            currentBlackCards,
            checkCards,
            advancedPossibility
          );
        checkCards.pop();
      }
    }
  }
}
