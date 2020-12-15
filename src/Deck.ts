import { Card } from "./types";
import { SUIT_ORDER, FACE_ORDER } from "./CONSTS";

export class Deck {
  protected _cards: Card[] = [];

  get cards() {
    return this._cards;
  }
  set cards(_) {}

  constructor() {
    this.reset();
  }

  reset(): void {
    for (let suit of SUIT_ORDER) {
      for (let value of FACE_ORDER) {
        this._cards.push({ suit, value });
      }
    }
  }

  draw(n: number): Card[] {
    return [];
  }

  shuffle(n: number): void {}
}
