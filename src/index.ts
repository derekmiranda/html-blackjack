import { Blackjack, BlackjackState, FlippableCard } from "./Blackjack";
import { FaceValue, Suit } from "./types";
import { SUIT_SYMBOL_MAP } from "./CONSTS";

let blackjack: Blackjack,
  playerCardsEl: HTMLElement,
  dealerCardsEl: HTMLElement,
  playerHeader: HTMLElement,
  dealerHeader: HTMLElement,
  cardNumEl: HTMLElement,
  winMsg: HTMLElement,
  loseMsg: HTMLElement,
  tieMsg: HTMLElement,
  playerBtnsContainer: HTMLElement,
  hitBtn: HTMLButtonElement,
  standBtn: HTMLButtonElement,
  playerDoneBtnsContainer: HTMLElement,
  continueBtn: HTMLButtonElement,
  resetBtn: HTMLButtonElement;

function main() {
  // cache elements
  playerCardsEl = <HTMLElement>document.getElementById("player-cards");
  dealerCardsEl = <HTMLElement>document.getElementById("dealer-cards");
  playerHeader = <HTMLElement>document.getElementById("player-header");
  dealerHeader = <HTMLElement>document.getElementById("dealer-header");
  cardNumEl = <HTMLElement>document.getElementById("card-num");
  winMsg = <HTMLElement>document.getElementById("win-msg");
  loseMsg = <HTMLElement>document.getElementById("lose-msg");
  tieMsg = <HTMLElement>document.getElementById("tie-msg");
  playerBtnsContainer = <HTMLElement>(
    document.getElementById("player-btns-container")
  );
  hitBtn = <HTMLButtonElement>document.getElementById("hit-btn");
  standBtn = <HTMLButtonElement>document.getElementById("stand-btn");
  playerDoneBtnsContainer = <HTMLElement>(
    document.getElementById("player-done-btns-container")
  );
  continueBtn = <HTMLButtonElement>document.getElementById("continue-btn");
  resetBtn = <HTMLButtonElement>document.getElementById("reset-btn");

  addListeners();

  blackjack = new Blackjack(render);
  blackjack.update({
    deal: true,
  });
}

function addListeners() {
  hitBtn.addEventListener("click", () => {
    blackjack.update({
      hit: true,
    });
  });

  standBtn.addEventListener("click", () => {
    blackjack.update({
      playerDone: true,
    });
  });

  continueBtn.addEventListener("click", () => {
    blackjack.update({
      newGame: true,
      deal: true,
    });
  });

  resetBtn.addEventListener("click", () => {
    blackjack.reset();
    blackjack.update({
      deal: true,
    });
  });
}

function render(state: BlackjackState) {
  const {
    playerCards,
    dealerCards,
    playerDone,
    hasLost,
    hasWon,
    hasTied,
  } = state;
  const { numCards } = blackjack.deck;
  const playerScore = Blackjack.getCardValues(playerCards);
  const dealerScore = Blackjack.getCardValues(dealerCards);

  playerCardsEl.innerHTML = playerCards
    .map((card: FlippableCard) => {
      return renderCard(card.suit, card.value, card.flipped);
    })
    .join("");
  dealerCardsEl.innerHTML = dealerCards
    .map((card: FlippableCard) => {
      return renderCard(card.suit, card.value, card.flipped);
    })
    .join("");
  playerHeader.innerText = `Player: ${playerScore}`;
  dealerHeader.innerText = dealerCards.every((card) => !card.flipped)
    ? `Dealer: ${dealerScore}`
    : "Dealer";
  cardNumEl.innerText = `Cards Left: ${numCards}`;

  if (hasWon) {
    winMsg.classList.remove("hide");
  } else {
    winMsg.classList.add("hide");
  }

  if (hasLost) {
    loseMsg.classList.remove("hide");
  } else {
    loseMsg.classList.add("hide");
  }

  if (hasTied) {
    tieMsg.classList.remove("hide");
  } else {
    tieMsg.classList.add("hide");
  }

  if (playerDone) {
    playerBtnsContainer.classList.add("hide");
    playerDoneBtnsContainer.classList.remove("hide");
  } else {
    playerBtnsContainer.classList.remove("hide");
    playerDoneBtnsContainer.classList.add("hide");
  }
}

function renderCard(suit: Suit, value: FaceValue, flipped: boolean) {
  if (flipped) {
    return `
    <div class="flipped-card">
      <p class="card__text">?</p>
    </div>
    `;
  }

  const colorClass =
    suit === Suit.Diamonds || suit === Suit.Hearts
      ? "color-red"
      : "color-black";
  const suitSymbol = SUIT_SYMBOL_MAP[suit];
  return `
    <div class="card ${colorClass}">
      <p class="card__text">${suitSymbol}${value}</p>
    </div> 
  `;
}

main();
