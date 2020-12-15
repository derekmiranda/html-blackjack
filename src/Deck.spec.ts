import { Deck } from "./Deck";
import { FACE_ORDER, SUIT_ORDER } from "./CONSTS";
import { Card, FaceValue, Suit } from "./types";

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
      for (let i = 0; i < 51; i++) {
        deck.draw(1);
      }
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

  describe("Default state", () => {
    const deck: Deck = new Deck();
    const cards: Card[] = [];

    while (deck.hasCards) {
      cards.push(deck.draw(1)[0]);
    }

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
