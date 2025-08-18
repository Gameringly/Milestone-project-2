const grid = document.getElementById("grid");

// Build blank grid
function buildGrid() {
    const px = document.createElement("div");
    px.className = "pixel";
    grid.appendChild(px);
}

buildGrid();