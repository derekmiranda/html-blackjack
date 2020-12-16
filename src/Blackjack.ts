import { Deck } from "./Deck";
import { Card, FaceValue } from "./types";
import { merge } from "./utils";

export interface FlippableCard extends Card {
  flipped: boolean;
}

export interface BlackjackState {
  playerCards: FlippableCard[];
  dealerCards: FlippableCard[];
  discarded: FlippableCard[];
  hasWon?: boolean;
  hasLost?: boolean;
  hasTied?: boolean;
  playerDone?: boolean;
  // triggers state calc
  deal?: boolean;
  hit?: boolean;
  newGame?: boolean;
}

export interface BlackjackStateUpdate {
  playerCards?: FlippableCard[];
  dealerCards?: FlippableCard[];
  discarded?: FlippableCard[];
  hasWon?: boolean;
  hasLost?: boolean;
  hasTied?: boolean;
  playerDone?: boolean;
  // triggers state calc
  deal?: boolean;
  hit?: boolean;
  newGame?: boolean;
}

export interface BlackjackStateRenderer {
  (state: BlackjackState): void;
}

export class Blackjack {
  static defaultState: BlackjackState = {
    playerCards: [],
    dealerCards: [],
    discarded: [],
    playerDone: false,
  };

  _state: BlackjackState;

  get state(): BlackjackState {
    return this._state;
  }
  set state(_) {}

  deck: Deck;
  render: BlackjackStateRenderer;

  constructor(render: BlackjackStateRenderer) {
    this.render = render;
    this.deck = new Deck();
    this.deck.shuffle();
    this._state = merge({}, Blackjack.defaultState);
  }

  update(stateUpdate: BlackjackStateUpdate = {}) {
    if (
      Object.keys(stateUpdate).length >= 1 ||
      stateUpdate.deal ||
      stateUpdate.hit
    ) {
      merge(this._state, stateUpdate);
      this.processState();
      delete this._state.newGame;
      delete this._state.deal;
      delete this._state.hit;
    }
    this.render(this._state);
  }

  processState() {
    // new game
    if (this._state.newGame) {
      const oldPlayerCards = this._state.playerCards;
      const oldDealerCards = this._state.dealerCards;
      merge(this._state, {
        playerCards: [],
        dealerCards: [],
        discarded: this._state.discarded
          .concat(oldPlayerCards)
          .concat(oldDealerCards),
        hasWon: false,
        hasLost: false,
        hasTied: false,
        playerDone: false,
      });
    }

    // deal cards - player then dealer
    if (this._state.deal) {
      const convertToFlippable = (card: FlippableCard) => {
        card.flipped = false;
        return card;
      };

      const newPlayerCards = (<FlippableCard[]>this.getCards(2)).map(
        convertToFlippable
      );
      const newDealerCards = (<FlippableCard[]>this.getCards(2)).map(
        convertToFlippable
      );
      newDealerCards[1].flipped = true;

      this._state.playerCards = this._state.playerCards.concat(newPlayerCards);
      this._state.dealerCards = this._state.dealerCards.concat(newDealerCards);
    }

    if (this._state.hit) {
      const newCard: FlippableCard = {
        ...this.getCards(1)[0],
        flipped: false,
      };
      this._state.playerCards.push(newCard);
    }

    const playerSum = this.getCardValues(
      <FlippableCard[]>this._state.playerCards
    );

    // if player done - dealer starts
    if (this._state.playerDone && playerSum < 21) {
      let dealerScore = this.getCardValues(this._state.dealerCards);
      let playerScore = this.getCardValues(this._state.playerCards);
      while (dealerScore <= playerScore && dealerScore < 21) {
        const newCard: FlippableCard = {
          ...this.getCards(1)[0],
          flipped: false,
        };
        this._state.dealerCards.push(newCard);
        dealerScore = this.getCardValues(this._state.dealerCards);
      }
    }

    const dealerSum = this.getCardValues(
      <FlippableCard[]>this._state.dealerCards
    );

    // tie
    if (
      // blackjack tie
      (playerSum === 21 && dealerSum === 21) ||
      (this._state.playerDone && playerSum > 21 && dealerSum > 21)
    ) {
      this._state.hasTied = true;
      this._state.playerDone = true;
      this.flipDealerCards();
      return;
    }
    // win
    else if (
      playerSum === 21 ||
      // dealer went over
      dealerSum > 21
    ) {
      this._state.hasWon = true;
      this._state.playerDone = true;
      this.flipDealerCards();
      return;
    }
    // lose
    else if (
      dealerSum === 21 ||
      // player went over
      playerSum > 21 ||
      // player finishes but dealer continues to get higher score
      (this._state.playerDone && dealerSum > playerSum)
    ) {
      this._state.hasLost = true;
      this._state.playerDone = true;
      this.flipDealerCards();
      return;
    }
  }

  getCardValues(cards: Card[]): number {
    let sum = 0;
    for (let card of cards) {
      if (card.value === FaceValue.Ace) {
        if (sum + 11 <= 21) {
          sum += 11;
        } else {
          sum += 1;
        }
      } else if (
        card.value === FaceValue.Jack ||
        card.value === FaceValue.Queen ||
        card.value === FaceValue.King
      ) {
        sum += 10;
      }
      // number cards
      else {
        const parsed = parseInt(card.value, 10);
        if (!isNaN(parsed)) {
          sum += parsed;
        }
      }
    }
    return sum;
  }

  getCards(n: number): Card[] {
    let card = this.deck.draw(n);
    // if no card, reshuffle discarded back into deck
    if (card.length < n) {
      this.deck.putBack(<Card[]>this._state.discarded);
      this.deck.shuffle();
      card = card.concat(this.deck.draw(n - card.length));
      merge(this._state, {
        discarded: [],
      });
    }
    return card;
  }

  reset(): void {
    this._state = merge({}, Blackjack.defaultState);
    this.deck.reset();
  }

  flipDealerCards(): void {
    for (let card of this._state.dealerCards) {
      card.flipped = false;
    }
  }
}
