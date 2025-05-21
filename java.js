document.addEventListener("DOMContentLoaded", () => {
  const allCards = [
    '🐟', '🐠', '🦈', '🐡', '🦑', '🐙', '🦞', '🦀',
    '🦐', '🐚', '🐬', '🐳', '🐋', '🦭', '🦦', '🌊',
    '🌴', '🏝️', '🪸', '🪼', '🦪', '⚓', '🚤', '🛥️',
    '🚢', '🏊‍♀️', '🤿', '🏖️', '🗺️', '🔱', '💧', '🌅'
  ];

  const gameBoard = document.getElementById('game-board');
  const startButton = document.getElementById('startGame');
  const resetButton = document.getElementById('reset-game');
  const movesDisplay = document.getElementById('moves');
  const matchesDisplay = document.getElementById('matches');
  const timeDisplay = document.getElementById('time');
  const finalMoves = document.getElementById('final-moves');
  const finalTime = document.getElementById('final-time');
  const winMessage = document.getElementById('win-message');
  const playerNameDisplay = document.getElementById('player-name');

  const playerName = localStorage.getItem("playerName")
  const level = localStorage.getItem("gameLevel") 
  playerNameDisplay.textContent = `Welcome, ${playerName}!`;

  let gridSize = 4;
  if (level === "medium") gridSize = 6;
  else if (level === "hard") gridSize = 8;
  const totalCards = gridSize * gridSize;

  let gameCards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let timer = null;
  let seconds = 0;
  let gameStarted = false;

  
const flipSound = new Audio('audio/flip.mp3');
const matchSound = new Audio('audio/match.mp3');

  function createCards() {
    const pairs = totalCards / 2;
    const selected = allCards.slice(0, pairs);
    gameCards = shuffle([...selected, ...selected]);

    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    gameCards.forEach(symbol => {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'game-card';

      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-symbol', symbol);

      const front = document.createElement('div');
front.className = 'card-face card-front';
front.innerHTML = '<img src="asssets/card cover.jpeg" alt="back" style="width: 70%; height: 70%;">';

const back = document.createElement('div');
back.className = 'card-face card-back';
back.textContent = symbol;



      card.appendChild(front);
      card.appendChild(back);
      cardContainer.appendChild(card);
      gameBoard.appendChild(cardContainer);

      card.addEventListener('click', handleFlip);
    });
  }

  function handleFlip() {
    if (!gameStarted || this.classList.contains('flipped') || flippedCards.length >= 2) return;

    this.classList.add('flipped');
    flipSound.play();

    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      updateDisplay();

      const [card1, card2] = flippedCards;
      const sym1 = card1.getAttribute("data-symbol");
      const sym2 = card2.getAttribute("data-symbol");

      const fstcrd = flippedCards[0];
      const sndcrd = flippedCards[1];

      if (sym1 === sym2) {
        matchedPairs++;
        matchSound.play();
          fstcrd.classList.add('matched');
          sndcrd.classList.add('matched');
        flippedCards = [];

        if (matchedPairs === totalCards / 2) endGame();
      } else {
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }

  function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    resetStats();
    startTimer();

    document.querySelectorAll('.card').forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
    }, 1000);
  }

  function resetGame() {
    clearInterval(timer);
    gameStarted = false;
    resetStats();
    createCards();
  }

  function updateDisplay() {
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matchedPairs;
  }

  function resetStats() {
    matchedPairs = 0;
    moves = 0;
    seconds = 0;
    flippedCards = [];
    updateDisplay();
    timeDisplay.textContent = "00:00";
    winMessage.classList.add('d-none');
  }

  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      timeDisplay.textContent = formatTime(seconds);
    }, 1000);
  }

  function formatTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function endGame() {
    clearInterval(timer);
    gameStarted = false;
    finalMoves.textContent = moves;
    finalTime.textContent = formatTime(seconds);
    winMessage.classList.remove('d-none');
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  createCards();
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
});