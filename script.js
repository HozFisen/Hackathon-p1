const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 0; 
let timer;
var level = 0;
let currentWidth = 600

function moveBox() {
  // Game Container Size
  let containerWidth = gameContainer.offsetWidth;
  let containerHeight = gameContainer.offsetHeight;
  const boxSize = targetBox.offsetWidth;

  // Target coordinates (Random)
  const randomX = Math.floor(Math.random() * (containerWidth - boxSize));
  const randomY = Math.floor(Math.random() * (containerHeight - boxSize));

  // Move Box to target coordinates.
  targetBox.style.left = `${randomX}px`;
  targetBox.style.top = `${randomY}px`;
}

function handleClick() {
  if (timeLeft > 0) {
    score++;
    scoreDisplay.textContent = score;
    timeLeft++
    moveBox();
    expandPlay(10);
    
  }
}

function endGame() { // Game Over
  targetBox.style.display = "none";
  alert("Game Over! Skor akhir: " + score);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 30;
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


function expandPlay(target) {
  console.log("jalaaaaaaaannn");
  let containerWidth = gameContainer.offsetWidth;
  let containerHeight = gameContainer.offsetHeight;
  containerWidth.style.width = `${currentWidth + target}px`
  containerHeight.style.height = `${currentWidth + target}px`

}


targetBox.addEventListener("click", handleClick);

startGame();
