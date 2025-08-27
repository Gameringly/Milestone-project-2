/* Intro handling */
const intro = document.getElementById("intro");
const main = document.getElementById("mainContent");
const helpBtn = document.getElementById("helpBtn");

document.getElementById("startIntroBtn").addEventListener("click", () => {
  intro.style.display = "none";
  main.style.display = "block";
  helpBtn.disabled = false;
});

document.getElementById("helpBtn").addEventListener("click", () => {
  intro.style.display = "flex";
  main.style.display = "none";
  helpBtn.disabled = true;
});

/* Main game handling */
let gridSize = 4;
let revealTime = 5;
let solutionGrid = [];
let playerGrid = [];
let currentColor = "red";
let timerInterval;
const colorValues = ["red","green","blue","yellow","orange","purple"];

const grid = document.getElementById("grid");
const mainBtn = document.getElementById("mainBtn");
const gridSizeSelect = document.getElementById("gridSizeSelect");
const revealTimeSelect = document.getElementById("revealTimeSelect");
const result = document.getElementById("result");
const timer = document.getElementById("timer");
const palette = document.getElementById("palette");
const modal = document.getElementById("scoreModal");
const scoreText = document.getElementById("scoreText");
const messageText = document.getElementById("messageText");
const closeModal = document.getElementById("closeModal");

/** Get colour from palette  */
palette.addEventListener("change", () => {
  const checked = palette.querySelector("input:checked");
  if (checked) currentColor = checked.value;
});

/** Build blank grid */
function buildGrid() {
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
  playerGrid = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const px = document.createElement("div");
    px.className = "pixel";
    px.addEventListener("click",() => {
        px.style.backgroundColor = currentColor;
        playerGrid[i] = currentColor;
    });
    grid.appendChild(px);
    playerGrid.push("white");
  }
}

/** Generate random solution */
function generateSolution() {
  solutionGrid = [];
  for (let i=0;i<gridSize*gridSize;i++) {
    solutionGrid.push(colorValues[Math.floor(Math.random()*colorValues.length)]);
  }
}

/** Reveal solution briefly */
function revealSolution() {
  const pixels = grid.querySelectorAll(".pixel");
  solutionGrid.forEach((c,i) => pixels[i].style.backgroundColor = c);

  let remaining = revealTime;
  timer.textContent = `Memorize: ${remaining}s`;
  mainBtn.disabled = true; // disable button during reveal
  grid.classList.add("disabled"); // disable grid clicks

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      timer.textContent = `Memorize: ${remaining}s`;
    } else {
      clearInterval(timerInterval);
      timer.textContent = "";
      pixels.forEach(p => p.style.backgroundColor = "white");
      mainBtn.disabled = false; // re-enable button
      grid.classList.remove("disabled"); // re-enable grid clicks
    }
  } ,1000);
}

/** Check answer */
function checkAnswer() {
  let correct = 0;
  for (let i = 0; i < solutionGrid.length; i++) {
    if (solutionGrid[i] === playerGrid[i]) correct++;
  }
  result.textContent = `You got ${correct} of ${solutionGrid.length} correct!`;
  mainBtn.textContent = "Show Solution";
  mainBtn.onclick = showSolution;

  // Update modal content
  scoreText.textContent = `You scored ${correct} / ${solutionGrid.length}!`;
  if (correct === solutionGrid.length) {
    messageText.textContent = "🎉 Perfect score! Amazing memory!";
  } else {
    messageText.textContent = "Keep practicing, you'll get it next time!";
  }

  // Show modal
  modal.style.display = "flex";
}

// Close modal on (X)
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if user clicks outside the box
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


/** Show solution fully */
function showSolution() {
  const pixels = grid.querySelectorAll(".pixel");
  solutionGrid.forEach((c,i) => pixels[i].style.backgroundColor = c);
  mainBtn.textContent = "Start Game";
  mainBtn.onclick = startGame;
}

/** Start new game */
function startGame() {
  gridSize = parseInt(gridSizeSelect.value,10);
  revealTime = parseInt(revealTimeSelect.value,10);
  result.textContent="";
  generateSolution();
  buildGrid();
  revealSolution();
  mainBtn.textContent = "Check Answer";
  mainBtn.onclick = checkAnswer;
}

buildGrid();
mainBtn.onclick = startGame;