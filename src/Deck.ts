import { Card, Suit, FaceValue } from "./types";

export class Deck {
  protected _cards: Card[];

  get cards() {
    return this._cards;
  }
  set cards(_) {}

  draw(n: number): Card[] {
    return [];
  }

  shuffle(n: number): void {}
}
