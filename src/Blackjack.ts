import { Deck } from "./Deck";
import { Card, FaceValue } from "./types";
import { merge } from "./utils";

interface FlippableCard extends Card {
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
  stand?: boolean;
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
  stand?: boolean;
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
      stateUpdate.hit ||
      stateUpdate.stand
    ) {
      merge(this._state, stateUpdate);
      this.processState();
      delete this._state.deal;
      delete this._state.hit;
      delete this._state.stand;
    }
    this.render(this._state);
  }

  processState() {
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

    // if player done - dealer starts
    if (this._state.playerDone) {
      let dealerScore = this.getCardValues(this._state.dealerCards);
      let playerScore = this.getCardValues(this._state.playerCards);
      while (dealerScore <= playerScore || dealerScore < 21) {
        const newCard: FlippableCard = {
          ...this.getCards(1)[0],
          flipped: false,
        };
        this._state.dealerCards.push(newCard);
        dealerScore = this.getCardValues(this._state.dealerCards);
      }

      this._state.playerDone = false;
    }

    // dealing done - process game result
    const playerSum = this.getCardValues(
      <FlippableCard[]>this._state.playerCards
    );
    const dealerSum = this.getCardValues(
      <FlippableCard[]>this._state.dealerCards
    );

    // tie
    if (playerSum === 21 && dealerSum === 21) {
      this._state.hasTied = true;
      this._state.playerDone = true;
      this.flipDealerCards();
      return;
    }
    // win
    else if (
      // blackjack
      playerSum === 21 ||
      // dealer went over
      dealerSum > 21
    ) {
      this._state.hasWon = true;
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

  flipDealerCards(): void {
    for (let card of this._state.dealerCards) {
      card.flipped = false;
    }
  }
}
