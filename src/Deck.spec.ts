import { Deck } from "./Deck";
import { FACE_ORDER, SUIT_ORDER } from "./CONSTS";

describe("Deck", () => {
  describe("Default state", () => {
    const deck = new Deck();

    test("Deck should have 52 cards", () => {
      expect(deck.cards.length).toBe(52);
    });

    test("Cards should be ordered by suit (alphabetical)", () => {
      const firstCardsOfEachSuit = [
        deck.cards[0],
        deck.cards[13],
        deck.cards[26],
        deck.cards[39],
      ];
      expect(firstCardsOfEachSuit.map((card) => card.suit)).toStrictEqual(
        SUIT_ORDER
      );
    });

    test("Cards should be ordered by face value within each suit", () => {
      for (let i = 0; i < 4; i++) {
        const offset = i * 13;
        const cardsOfSuit = deck.cards.slice(offset, offset + 13);
        expect(cardsOfSuit.map((card) => card.value)).toStrictEqual(FACE_ORDER);
      }
    });
  });
});
