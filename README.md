# Zencastr - Deck of Cards

## Requirements

- [x] Create class that represents a deck of cards
- [ ] Create an HTML/CSS UI for a game that interacts with this deck of cards class
- [x] Please make sure there is a valid package.json file in the root of the repo
- [ ] Upload this homework to a github repository or a github gist

## 1. Deck class

- 4 suits (hearts, spades, clubs, diamonds)
- each suit has 13 cards: A, 2-10, J, Q, K
- uses `Card` class to represent playing cards
- general purpose deck class so minimal, unopinionated API

### Methods

- `draw(n: number): Card[]` - returns `n` number of cards from current deck
  - if no cards left, returns empty array
- `shuffle(): void` - shuffles deck
- `reset(): void` - puts all cards back into deck and reshuffles

### Card class

Properties

- `value: string` - card value (J, Q, K...)
- `suit: Suit` - indicates card's suit (Hearts, Spades...)

## HTML/CSS Game using cards - Blackjack

- TODO: rules to implement
- just using 1 deck for simplicity
- player can place bets

### From [Bicycle's Blackjack Guide](https://bicyclecards.com/how-to-play/blackjack/)

- "Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21."
- "It is up to each individual player if an ace is worth 1 or 11. Face cards are 10 and any other card is its pip value."

## Other Things to Consider

- how to handle games with slight alterations to the deck
- inserting cards back into deck and at certain or random places
