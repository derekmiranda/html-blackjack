# Deck of Cards + Blackjack

## Instructions To Run

- Clone/download repo
- Run `npm start` and navigate to `http://localhost:1234` in browser

## Requirements

- [x] Create class that represents a deck of cards
- [x] Create an HTML/CSS UI for a game that interacts with this deck of cards class
- [x] Please make sure there is a valid package.json file in the root of the repo
- [x] Upload this homework to a github repository or a github gist

## 1. Deck class

- 4 suits (hearts, spades, clubs, diamonds)
- each suit has 13 cards: A, 2-10, J, Q, K
- uses `Card` objects to represent playing cards
  - `value: FaceValue` - card value (`'J'`, `'Q'`, `'K'`...)
  - `suit: Suit` - indicates card's suit (Hearts, Spades...)
- general purpose deck class so minimal, unopinionated API
- takes in `render` function as constructor parameter. `render` uses the state of the Blackjack game (`BlackJackState`) to render UI similar to a Redux store triggering UI updates.

### Methods

- `draw(n: number): Card[]` - returns `n` number of cards from current deck
  - if no cards left, returns empty array
- `shuffle(): void` - shuffles deck
- `reset(): void` - puts all cards back into deck and reshuffles

## HTML/CSS Game using cards - Blackjack

- just using 1 deck for simplicity

### From [Bicycle's Blackjack Guide](https://bicyclecards.com/how-to-play/blackjack/)

- "Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21."
- "It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value."
- dealer and player get one card face up each. Then player gets another face up card and dealer gets one face down
- natural/blackjack (initial pair totals 21) = player/dealer instantly wins if other doesn't have one as well
  - if both player and dealer have naturals, is a tie

## Other Things to Consider

- how to handle games with slight alterations to the deck
- inserting cards back into deck at certain or random places
- working with multiple decks
- preventing unnecessary rerenders
- browser testing (only tested on OSX Chrome)
