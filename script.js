// Variable Set
const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

let score = 0;

function moveBox() {
  // Game Container Size
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  const boxSize = targetBox.offsetWidth; // Box size

  // Set coordinates for next move.
  const randomX = Math.floor(Math.random() * (containerWidth - boxSize));
  const randomY = Math.floor(Math.random() * (containerHeight - boxSize));

  // Moves the Box
  targetBox.style.left = `${randomX}px`;
  targetBox.style.top = `${randomY}px`;
}

// Handles user Input
function handleClick() {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
}

targetBox.addEventListener("click", handleClick);

moveBox();
