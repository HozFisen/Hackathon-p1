const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

let score = 0;

function moveBox() {
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  const boxSize = targetBox.offsetWidth;

  const randomX = Math.floor(Math.random() * (containerWidth - boxSize));
  const randomY = Math.floor(Math.random() * (containerHeight - boxSize));

  targetBox.style.left = `${randomX}px`;
  targetBox.style.top = `${randomY}px`;
}

function handleClick() {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
}

targetBox.addEventListener("click", handleClick);

moveBox();
