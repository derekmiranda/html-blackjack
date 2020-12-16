import { Blackjack, BlackjackStateRenderer } from "./Blackjack";
import { Deck } from "./Deck";
import { FaceValue, Suit } from "./types";

Deck.prototype.shuffle = () => {};

describe("Blackjack", () => {
  const render = <BlackjackStateRenderer>jest.fn();
  const blackjack = new Blackjack(render);
  blackjack.update();

  test("calls passed-in render function after update", () => {
    expect(render).toBeCalled();
  });

  test("Passes in default state to render fn", () => {
    expect(render).toBeCalledWith({
      playerCards: [],
      dealerCards: [],
      discarded: [],
      playerDone: false,
    });
  });

  describe("Dealing", () => {
    const render = <BlackjackStateRenderer>jest.fn();
    const blackjack = new Blackjack(render);
    blackjack.update({
      deal: true,
    });
    expect(render).toBeCalledWith({
      playerCards: [
        {
          suit: Suit.Clubs,
          value: FaceValue.Ace,
          flipped: false,
        },
        {
          suit: Suit.Clubs,
          value: FaceValue.Two,
          flipped: false,
        },
      ],
      dealerCards: [
        {
          suit: Suit.Clubs,
          value: FaceValue.Three,
          flipped: false,
        },
        {
          suit: Suit.Clubs,
          value: FaceValue.Four,
          flipped: true,
        },
      ],
      discarded: [],
      playerDone: false,
    });
  });

  describe("Player wins", () => {
    test("Player blackjack", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        playerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: false,
          },
        ],
        dealerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Three,
            flipped: true,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasWon: true,
        dealerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Three,
            flipped: false,
          },
        ],
        discarded: [],
        playerDone: true,
      });
    });

    test("Player wins b/c dealer goes over", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        // score: 20
        playerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Three,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Eight,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Nine,
            flipped: false,
          },
        ],
        // score: 22
        dealerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Ten,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Ten,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasWon: true,
        discarded: [],
        playerDone: true,
      });
    });

    test("Player wins w/ Ace valued as 1", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        // score: 21
        playerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.King,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Jack,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Ace,
            flipped: false,
          },
        ],
        dealerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Ten,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasWon: true,
        discarded: [],
        playerDone: true,
      });
    });

    test("Player wins w/ Ace valued as 11", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        // score: 21
        playerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Five,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Five,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Ace,
            flipped: false,
          },
        ],
        dealerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Ten,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasWon: true,
        discarded: [],
        playerDone: true,
      });
    });
  });

  describe("Dealer wins", () => {
    test("Dealer blackjack", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: true,
          },
        ],
        playerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Three,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasLost: true,
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: false,
          },
        ],
        discarded: [],
        playerDone: true,
      });
    });

    test("Player goes over", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: true,
          },
        ],
        // score: 22
        playerCards: [
          {
            suit: Suit.Diamonds,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Spades,
            value: FaceValue.King,
            flipped: false,
          },
          {
            suit: Suit.Spades,
            value: FaceValue.Two,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasLost: true,
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: false,
          },
        ],
        discarded: [],
        playerDone: true,
      });
    });
  });

  describe("Ties", () => {
    test("Blackjack tie", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: true,
          },
        ],
        playerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Queen,
            flipped: false,
          },
        ],
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        hasTied: true,
        discarded: [],
        playerDone: true,
      });
    });

    test("Regular tie", () => {
      const render = <BlackjackStateRenderer>jest.fn();
      const blackjack = new Blackjack(render);
      const initialState = {
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: true,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Five,
            flipped: true,
          },
        ],
        playerCards: [
          {
            suit: Suit.Spades,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Queen,
            flipped: false,
          },
          {
            suit: Suit.Diamonds,
            value: FaceValue.Seven,
            flipped: false,
          },
        ],
        playerDone: true,
      };
      blackjack.update(initialState);
      expect(render).toBeCalledWith({
        ...initialState,
        dealerCards: [
          {
            suit: Suit.Clubs,
            value: FaceValue.Ace,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.King,
            flipped: false,
          },
          {
            suit: Suit.Hearts,
            value: FaceValue.Five,
            flipped: false,
          },
        ],
        hasTied: true,
        discarded: [],
        playerDone: true,
      });
    });
  });
});
