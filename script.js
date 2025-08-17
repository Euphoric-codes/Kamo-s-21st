// Confetti animation from canvas-confetti library logic simplified
const confettiBtn = document.getElementById('confettiBtn');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

let confettiPieces = [];
const colors = ['#9c27b0', '#d46a9f', '#4a716e', '#f9e6f7', '#222'];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfettiPiece() {
  return {
    x: randomRange(0, window.innerWidth),
    y: randomRange(-20, 0),
    size: randomRange(5, 10),
    speedY: randomRange(2, 5),
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: randomRange(-10, 10),
    tiltSpeed: randomRange(0.05, 0.12),
  };
}

function setupCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.size, p.size / 2, p.tilt, 0, 2 * Math.PI);
    ctx.fill();

    p.y += p.speedY;
    p.tilt += p.tiltSpeed;

    if (p.y > canvas.height) {
      p.y = randomRange(-20, 0);
      p.x = randomRange(0, canvas.width);
    }
  });
}

let animationId;
function animateConfetti() {
  drawConfetti();
  animationId = requestAnimationFrame(animateConfetti);
}

confettiBtn.addEventListener('click', () => {
  if (confettiPieces.length === 0) {
    for (let i = 0; i < 150; i++) {
      confettiPieces.push(createConfettiPiece());
    }
    setupCanvas();
    animateConfetti();

    // Stop confetti after 5 seconds
    setTimeout(() => {
      confettiPieces = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }, 5000);
  }
});

function flipCard(card) {
  card.classList.toggle('flipped');
}
