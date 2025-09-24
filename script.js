const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 0; 
let timer;

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
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
  }
}

function endGame() {
  targetBox.style.display = "none";
  alert("Game Over! Skor akhir: " + score);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 5;
  timeDisplay.textContent = timeLeft;

  moveBox();

    timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}



targetBox.addEventListener("click", handleClick);

startGame();
