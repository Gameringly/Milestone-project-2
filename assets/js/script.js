let gridSize = 4

const grid = document.getElementById("grid");

// Build blank grid
function buildGrid() {
     grid.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
     for (let i=0; i < gridSize * gridSize; i++) {
        const px = document.createElement("div");
        px.className = "pixel";
        grid.appendChild(px);
     }
}

buildGrid();