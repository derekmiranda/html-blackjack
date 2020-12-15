import { Card } from "./types";
import { SUIT_ORDER, FACE_ORDER } from "./CONSTS";

export class Deck {
  // use as stack
  protected _cards: Card[] = [];

  get cards() {
    return this._cards;
  }

  get hasCards() {
    return !!this._cards.length;
  }

  constructor() {
    this.reset();
  }

  reset(): void {
    // insert in reverse order
    for (let i = SUIT_ORDER.length - 1; i >= 0; i--) {
      for (let j = FACE_ORDER.length - 1; j >= 0; j--) {
        this._cards.push({ suit: SUIT_ORDER[i], value: FACE_ORDER[j] });
      }
    }
  }

  draw(n: number): Card[] {
    if (n < 1) return [];

    const cardsToReturn: Card[] = [];
    let i = 0;
    while (this._cards.length && i < n) {
      const card: Card = <Card>this._cards.pop();
      card && cardsToReturn.push(card);
      i++;
    }

    return cardsToReturn;
  }

  shuffle(): void {
    // swap current idx with randomized idx
    for (let i = 0; i < this._cards.length; i++) {
      const randIdx = Math.floor(Math.random() * this._cards.length);
      const temp = this._cards[i];
      this._cards[i] = this._cards[randIdx];
      this._cards[randIdx] = temp;
    }
  }
}
