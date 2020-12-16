import { Suit, FaceValue } from "./types";

// for guaranteeing iteration order
export const SUIT_ORDER = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
export const FACE_ORDER = [
  FaceValue.Ace,
  FaceValue.Two,
  FaceValue.Three,
  FaceValue.Four,
  FaceValue.Five,
  FaceValue.Six,
  FaceValue.Seven,
  FaceValue.Eight,
  FaceValue.Nine,
  FaceValue.Ten,
  FaceValue.Jack,
  FaceValue.Queen,
  FaceValue.King,
];

export const SUIT_SYMBOL_MAP = {
  [Suit.Clubs]: "♣",
  [Suit.Hearts]: "♥",
  [Suit.Diamonds]: "♦",
  [Suit.Spades]: "♠",
};
