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
    });
  });

  describe("Dealing", () => {
    const render = <BlackjackStateRenderer>jest.fn();
    const blackjack = new Blackjack(render);
    // 1st player card
    blackjack.update({
      continue: true,
    });
    expect(render).toBeCalledWith({
      playerCards: [
        {
          suit: Suit.Clubs,
          value: FaceValue.Ace,
          flipped: false,
        },
      ],
      dealerCards: [],
      discarded: [],
    });
    // 2nd player card
    blackjack.update({
      continue: true,
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
      dealerCards: [],
      discarded: [],
    });
    // 1st dealer card
    blackjack.update({
      continue: true,
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
      ],
      discarded: [],
    });
  });

  // describe("Player wins", () => {
  //   test("Player blackjack", () => {
  //     const render = <BlackjackStateRenderer>jest.fn();
  //     const blackjack = new Blackjack(render);
  //     const initialState = {
  //       playerCards: [
  //         {
  //           suit: Suit.Clubs,
  //           value: FaceValue.Ace,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.King,
  //           flipped: false,
  //         },
  //       ],
  //       dealerCards: [
  //         {
  //           suit: Suit.Spades,
  //           value: FaceValue.Two,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Diamonds,
  //           value: FaceValue.Three,
  //           flipped: true,
  //         },
  //       ],
  //     };
  //     blackjack.update(initialState);
  //     expect(render).toBeCalledWith({
  //       ...initialState,
  //       hasWon: true,
  //       dealerCards: [
  //         {
  //           suit: Suit.Spades,
  //           value: FaceValue.Two,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Diamonds,
  //           value: FaceValue.Three,
  //           flipped: false,
  //         },
  //       ],
  //     });
  //   });

  //   test("Player wins b/c dealer goes over", () => {
  //     const render = <BlackjackStateRenderer>jest.fn();
  //     const blackjack = new Blackjack(render);
  //     const initialState = {
  //       // score: 20
  //       playerCards: [
  //         {
  //           suit: Suit.Clubs,
  //           value: FaceValue.Three,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Eight,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Nine,
  //           flipped: false,
  //         },
  //       ],
  //       // score: 22
  //       dealerCards: [
  //         {
  //           suit: Suit.Spades,
  //           value: FaceValue.Two,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Diamonds,
  //           value: FaceValue.Ten,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Ten,
  //           flipped: false,
  //         },
  //       ],
  //     };
  //     blackjack.update(initialState);
  //     expect(render).toBeCalledWith({
  //       ...initialState,
  //       hasWon: true,
  //     });
  //   });

  //   test("Player wins w/ Ace valued as 1", () => {
  //     const render = <BlackjackStateRenderer>jest.fn();
  //     const blackjack = new Blackjack(render);
  //     const initialState = {
  //       // score: 21
  //       playerCards: [
  //         {
  //           suit: Suit.Clubs,
  //           value: FaceValue.King,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Jack,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Ace,
  //           flipped: false,
  //         },
  //       ],
  //       dealerCards: [
  //         {
  //           suit: Suit.Spades,
  //           value: FaceValue.Two,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Diamonds,
  //           value: FaceValue.Ten,
  //           flipped: false,
  //         },
  //       ],
  //     };
  //     blackjack.update(initialState);
  //     expect(render).toBeCalledWith({
  //       ...initialState,
  //       hasWon: true,
  //     });
  //   });

  //   test("Player wins w/ Ace valued as 11", () => {
  //     const render = <BlackjackStateRenderer>jest.fn();
  //     const blackjack = new Blackjack(render);
  //     const initialState = {
  //       // score: 21
  //       playerCards: [
  //         {
  //           suit: Suit.Clubs,
  //           value: FaceValue.Five,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Five,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Hearts,
  //           value: FaceValue.Ace,
  //           flipped: false,
  //         },
  //       ],
  //       dealerCards: [
  //         {
  //           suit: Suit.Spades,
  //           value: FaceValue.Two,
  //           flipped: false,
  //         },
  //         {
  //           suit: Suit.Diamonds,
  //           value: FaceValue.Ten,
  //           flipped: false,
  //         },
  //       ],
  //     };
  //     blackjack.update(initialState);
  //     expect(render).toBeCalledWith({
  //       ...initialState,
  //       hasWon: true,
  //     });
  //   });
  // });

  // test("Dealer blackjack", () => {
  //   const render = <BlackjackStateRenderer>jest.fn();
  //   const blackjack = new Blackjack(render);
  //   const initialState = {
  //     dealerCards: [
  //       {
  //         suit: Suit.Clubs,
  //         value: FaceValue.Ace,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Hearts,
  //         value: FaceValue.King,
  //         flipped: true,
  //       },
  //     ],
  //     playerCards: [
  //       {
  //         suit: Suit.Spades,
  //         value: FaceValue.Two,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Diamonds,
  //         value: FaceValue.Three,
  //         flipped: false,
  //       },
  //     ],
  //   };
  //   blackjack.update(initialState);
  //   expect(render).toBeCalledWith({
  //     ...initialState,
  //     hasLost: true,
  //     dealerCards: [
  //       {
  //         suit: Suit.Clubs,
  //         value: FaceValue.Ace,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Hearts,
  //         value: FaceValue.King,
  //         flipped: false,
  //       },
  //     ],
  //   });
  // });

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
      discarded: [],
    };
    blackjack.update(initialState);
    expect(render).toBeCalledWith({
      ...initialState,
      hasTied: true,
    });
  });

  // test("Discarding cards", () => {
  //   const render = <BlackjackStateRenderer>jest.fn();
  //   const blackjack = new Blackjack(render);
  //   const initialState = {
  //     playerCards: [
  //       {
  //         suit: Suit.Clubs,
  //         value: FaceValue.Ace,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Hearts,
  //         value: FaceValue.King,
  //         flipped: false,
  //       },
  //     ],
  //     dealerCards: [
  //       {
  //         suit: Suit.Spades,
  //         value: FaceValue.Two,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Diamonds,
  //         value: FaceValue.Three,
  //         flipped: true,
  //       },
  //     ],
  //   };
  //   blackjack.update(initialState);

  //   // trigger discarding cards
  //   blackjack.update({ triggerDiscard: true });
  //   expect(render).toBeCalledWith({
  //     // player cards come before dealer's
  //     discarded: [
  //       {
  //         suit: Suit.Clubs,
  //         value: FaceValue.Ace,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Hearts,
  //         value: FaceValue.King,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Spades,
  //         value: FaceValue.Two,
  //         flipped: false,
  //       },
  //       {
  //         suit: Suit.Diamonds,
  //         value: FaceValue.Three,
  //         flipped: false,
  //       },
  //     ],
  //   });
  // });
});