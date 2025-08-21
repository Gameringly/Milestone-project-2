let gridSize = 4
let currentColor = "red";

const grid = document.getElementById("grid");
const palette = document.getElementById("palette");

// Get colour from palette  
palette.addEventListener("change", () => {
  const checked = palette.querySelector("input:checked");
  if (checked) currentColor = checked.value;
});

// Build blank grid
function buildGrid() {
     grid.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
     for (let i=0; i < gridSize * gridSize; i++) {
        const px = document.createElement("div");
        px.className = "pixel";
        px.addEventListener("click",()=> {
            px.style.backgroundColor = currentColor;
        });
        grid.appendChild(px);
     }
}

// Start new game
function startGame() {
  console.log("game start")
}

buildGrid();
mainBtn.onclick = startGame;