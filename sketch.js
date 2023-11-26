function setup() {
  resolution = Math.min(windowWidth, windowHeight);
  createCanvas(resolution, resolution);

  resetSketch();
}

function resetSketch() {
  cells = [];
  const dummy = new Cell(1);
  cells.push(dummy);

  for (let i = 0; i < N * N; i++) {
    cells.push(new Cell(i + 1));
  }

  Cell.reset();
}

function draw() {
  clear();

  for (let cell of cells) {
    cell.draw();
  }

  for (let cell of cells) {
    cell.drawOverlay();
  }

  Cell.drawShortcuts();
  Cell.drawSearchPath();
}

function mouseClicked() {
  for (let cell of cells) {
    cell.handleClick();
  }
}
