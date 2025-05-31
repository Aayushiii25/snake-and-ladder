let currentPlayer = 1;
let positions = [0, 0];
let playerNames = [];
const ladders = {3: 22, 5: 8, 11: 26, 20: 29, 27: 56, 36: 44, 50: 67, 70: 90};
const snakes = {17: 4, 19: 7, 21: 9, 43: 23, 62: 18, 87: 24, 95: 51, 99: 5};

const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const tileSize = 60;
const cols = 10;
const rows = 10;

function drawBoard() {
  let count = 1;
  for (let y = rows - 1; y >= 0; y--) {
    for (let x = 0; x < cols; x++) {
      const i = y % 2 === 0 ? x : cols - 1 - x;
      ctx.fillStyle = (count % 2 === 0) ? "#e0f7fa" : "#fff9c4";
      ctx.fillRect(i * tileSize, y * tileSize, tileSize, tileSize);
      ctx.strokeRect(i * tileSize, y * tileSize, tileSize, tileSize);
      ctx.fillStyle = "#333";
      ctx.fillText(count, i * tileSize + 5, y * tileSize + 15);
      count++;
    }
  }
}

function drawPlayers() {
  drawBoard();
  positions.forEach((pos, index) => {
    if (pos === 0) return;
    let x = (pos - 1) % 10;
    let y = Math.floor((pos - 1) / 10);
    if (Math.floor(y) % 2 !== 0) x = 9 - x;
    ctx.beginPath();
    ctx.arc(x * tileSize + 30, (9 - y) * tileSize + 30, 15, 0, 2 * Math.PI);
    ctx.fillStyle = index === 0 ? "red" : "green";
    ctx.fill();
  });
}

function startGame() {
  playerNames = [
    document.getElementById("player1").value || "Player 1",
    document.getElementById("player2").value || "Player 2"
  ];
  positions = [0, 0];
  currentPlayer = 1;
  document.getElementById("winnerBanner").classList.remove("show");
  updateUI();
  drawPlayers();
}

function updateUI() {
  document.getElementById("currentPlayer").textContent =
    "Player Turn: " + playerNames[currentPlayer - 1];
}

function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById("diceResult").textContent = "Dice: " + dice;
  movePlayer(dice);
}

function movePlayer(dice) {
  let pos = positions[currentPlayer - 1] + dice;
  if (pos > 100) pos = positions[currentPlayer - 1]; // don’t move
  if (ladders[pos]) {
    alert("Ladder! Climb up!");
    pos = ladders[pos];
  }
  if (snakes[pos]) {
    alert("Snake bite! Slide down!");
    pos = snakes[pos];
  }
  positions[currentPlayer - 1] = pos;
  drawPlayers();
  if (pos === 100) {
    document.getElementById("winnerBanner").textContent =
      "🏆 " + playerNames[currentPlayer - 1] + " Wins! 🏆";
    document.getElementById("winnerBanner").classList.add("show");
    return;
  }
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateUI();
}

drawBoard();
