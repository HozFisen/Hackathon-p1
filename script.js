// === Element HTML ===
const targetBox = document.getElementById("target-box");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");
const timeDisplay = document.getElementById("time");
const resetButton = document.getElementById("reset-btn");

// === Suara Efek ===
const clickSound = new Audio('pop-402323.mp3');
const winSound = new Audio('hidup-jokowi.mp3');
const gameOverSound = new Audio('level-win-6416.mp3');

// === Backsound Musik ===
const backgroundMusic = new Audio('pixel-rush-8-bit-chiptune-background-music-410043.mp3');
backgroundMusic.loop = true;    // Biar musik mengulang terus
backgroundMusic.volume = 0.2;   // Volume musik latar (0.0 - 1.0)

// Atur volume efek suara
clickSound.volume = 1.0;
winSound.volume = 0.5;
gameOverSound.volume = 1.0;

// === Variabel Game ===
let score = 0;
let timeLeft = 0;
let timer = null;
let startTime = 0;        // Untuk mencatat waktu mulai
let currentBoxSize = 50;  // Ukuran awal kotak merah (px)
let timerStarted = false; // Flag untuk cek apakah timer sudah berjalan

// === Fungsi Izin Audio ===
// Mengatasi browser yang memblokir autoplay audio
document.addEventListener('click', () => {
  backgroundMusic.play().catch(() => {});
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  clickSound.play().catch(() => {});
  clickSound.pause();
  clickSound.currentTime = 0;
}, { once: true });

// === Fungsi Pindah Kotak ke Posisi Acak ===
function moveBox() {
  const containerWidth = gameContainer.offsetWidth;
  const containerHeight = gameContainer.offsetHeight;
  const boxSize = targetBox.offsetWidth;

  const randomX = Math.floor(Math.random() * (containerWidth - boxSize));
  const randomY = Math.floor(Math.random() * (containerHeight - boxSize));

  targetBox.style.left = `${randomX}px`;
  targetBox.style.top = `${randomY}px`;
}

// === Fungsi Mulai Timer ===
function startTimer() {
  if (!timerStarted) {
    timerStarted = true; // Tandai bahwa timer sudah dimulai
    startTime = Date.now(); // Catat waktu awal

    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }
}

// === Fungsi Klik Kotak ===
function handleClick() {
  // Mulai timer saat klik pertama
  startTimer();

  if (timeLeft > 0) {
    // Mainkan suara klik
    clickSound.currentTime = 0;
    clickSound.play();

    // Tambah skor
    score++;
    scoreDisplay.textContent = score;

    // Kecilkan ukuran kotak
    currentBoxSize -= 5;

    // Jika ukuran kotak sudah nol → Menang
    if (currentBoxSize <= 0) {
      targetBox.style.display = "none";
      clearInterval(timer);

      // Stop musik latar dan mainkan suara kemenangan
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      winSound.play();

      // Hitung waktu yang dipakai
      const endTime = Date.now();
      const elapsedTime = ((endTime - startTime) / 1000).toFixed(2); // dalam detik

      alert("Bang Jago Juara! Dengan waktu: " + elapsedTime + " detik");
      return;
    }

    // Update ukuran kotak di layar
    targetBox.style.width = `${currentBoxSize}px`;
    targetBox.style.height = `${currentBoxSize}px`;

    // Pindahkan kotak
    moveBox();
  }
}

// === Fungsi Game Over ===
function endGame() {
  targetBox.style.display = "none";

  // Stop musik latar dan mainkan suara game over
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
  gameOverSound.play();

  alert("Game Over! Skor akhir: " + score);
}

// === Fungsi Mulai Game ===
function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  timeLeft = 15;
  timeDisplay.textContent = timeLeft;
  currentBoxSize = 50;
  timerStarted = false; // Timer belum berjalan

  targetBox.style.display = "block";
  targetBox.style.width = `${currentBoxSize}px`;
  targetBox.style.height = `${currentBoxSize}px`;

  moveBox();

  // Musik latar mulai dari awal
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();
}

// === Fungsi Reset Game ===
function resetGame() {
  clearInterval(timer);
  startGame();
}

// === Event Listeners ===
targetBox.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);

// === Mulai Game Saat Halaman Dibuka ===
startGame();
