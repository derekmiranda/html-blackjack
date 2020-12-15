import { Deck } from "./Deck";
import { FACE_ORDER, SUIT_ORDER } from "./CONSTS";
import { Card, FaceValue, Suit } from "./types";

// mock Math.random
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe("Deck", () => {
  describe("Drawing cards", () => {
    test("Drawing 1 card at a time", () => {
      const deck = new Deck();
      expect(deck.draw(1)).toStrictEqual([
        {
          suit: Suit.Clubs,
          value: FaceValue.Ace,
        },
      ]);
      expect(deck.draw(1)).toStrictEqual([
        {
          suit: Suit.Clubs,
          value: FaceValue.Two,
        },
      ]);
    });

    test("Drawing no cards", () => {
      const deck = new Deck();
      expect(deck.draw(0)).toStrictEqual([]);
    });

    test("Drawing multiple cards", () => {
      const deck = new Deck();
      expect(deck.draw(2)).toStrictEqual([
        {
          suit: Suit.Clubs,
          value: FaceValue.Ace,
        },
        {
          suit: Suit.Clubs,
          value: FaceValue.Two,
        },
      ]);
    });

    test("Drawing more cards than deck has", () => {
      const deck = new Deck();
      // take out 51 cards
      deck.draw(51);
      expect(deck.hasCards).toBe(true);

      // try taking 2 cards out
      const drawnCards = deck.draw(2);
      expect(drawnCards).toStrictEqual([
        {
          suit: Suit.Spades,
          value: FaceValue.King,
        },
      ]);
      expect(deck.hasCards).toBe(false);
    });
  });

  describe("Shuffling", () => {
    test("Deck randomizes order when shuffle() is called", () => {
      const deck = new Deck();

      // taking cards out to test shuffling with only one suit
      // easier to determine output
      deck.draw(13 * 3);

      // with Math.random mocked to return only 0.5,
      // can easily determine shuffled order
      const shuffledValues = [
        FaceValue.Two,
        FaceValue.Three,
        FaceValue.Four,
        FaceValue.Five,
        FaceValue.Six,
        FaceValue.Eight,
        FaceValue.Ace,
        FaceValue.Nine,
        FaceValue.Ten,
        FaceValue.Jack,
        FaceValue.Queen,
        FaceValue.King,
        FaceValue.Seven,
      ];
      deck.shuffle();

      const drawn = deck.draw(13);
      expect(drawn.map((card) => card.value)).toStrictEqual(shuffledValues);
      expect(drawn.length).toBe(13);
    });
  });

  describe("Default state", () => {
    const deck: Deck = new Deck();
    const cards: Card[] = deck.draw(52);

    test("Deck should have 52 cards", () => {
      expect(cards.length).toBe(52);
    });

    test("Cards should be ordered by suit (alphabetical)", () => {
      const firstCardsOfEachSuit = [cards[0], cards[13], cards[26], cards[39]];
      expect(firstCardsOfEachSuit.map((card) => card.suit)).toStrictEqual(
        SUIT_ORDER
      );
    });

    test("Cards should be ordered by face value within each suit", () => {
      for (let i = 0; i < 4; i++) {
        const offset = i * 13;
        const cardsOfSuit = cards.slice(offset, offset + 13);
        expect(cardsOfSuit.map((card) => card.value)).toStrictEqual(FACE_ORDER);
      }
    });
  });
});
