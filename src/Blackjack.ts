import { Deck } from "./Deck";
import { Card, FaceValue } from "./types";
import { merge } from "./utils";

interface FlippableCard extends Card {
  flipped: boolean;
}

export interface BlackjackState {
  playerCards?: FlippableCard[];
  dealerCards?: FlippableCard[];
  discarded?: FlippableCard[];
  hasWon?: boolean;
  hasLost?: boolean;
  hasTied?: boolean;
  continue?: boolean;
}

export interface BlackjackStateRenderer {
  (state: BlackjackState): void;
}

export class Blackjack {
  static defaultState: BlackjackState = {
    playerCards: [],
    dealerCards: [],
    discarded: [],
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
    this.render(this._state);
  }

  update(stateUpdate: BlackjackState = {}) {
    if (Object.keys(stateUpdate).length >= 1 || stateUpdate.continue) {
      delete stateUpdate.continue;
      merge(this._state, stateUpdate);
      this.processState();
    }
    this.render(this._state);
  }

  processState() {
    // deal cards - player then dealer
    const playerCards = <FlippableCard[]>this._state.playerCards;
    if (playerCards.length < 2) {
      const card: FlippableCard = {
        ...this.getCard(),
        flipped: false,
      };
      playerCards.push(card);
      return;
    }
    const dealerCards = <FlippableCard[]>this._state.dealerCards;
    if (dealerCards.length < 2) {
      const card: FlippableCard = {
        ...this.getCard(),
        flipped: dealerCards.length >= 1,
      };
      dealerCards.push(card);
      return;
    }

    // dealing done - process game result
    const playerSum = this.getCardValues(playerCards);
    const dealerSum = this.getCardValues(playerCards);

    // blackjack tie
    if (playerSum === 21 && dealerSum === 21) {
      this._state.hasTied = true;
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

  getCard(): Card {
    let card = this.deck.draw(1);
    // if no card, reshuffle discarded back into deck
    if (card.length < 1) {
      this.deck.putBack(<Card[]>this._state.discarded);
      this.deck.shuffle();
      card = this.deck.draw(1);
      merge(this._state, {
        discarded: [],
      });
    }
    return card[0];
  }

  flipDealerCards(): void {
    for (let card of <FlippableCard[]>this._state.dealerCards) {
      card.flipped = false;
    }
  }
}
