const DIE_SIZE = 6;
const N = 10;
const infile = { 8: 52, 6: 80, 26: 42, 2: 72, 51: 19, 39: 11, 37: 29, 81: 3, 59: 5, 79: 23, 53: 7, 43: 33, 77: 21 };
const cells = [];

function setup() {
  resolution = Math.min(windowWidth, windowHeight);
  createCanvas(resolution, resolution);

  // drawGrid();

  const dummy = new Cell(1);
  cells.push(dummy);

  for (let i = 0; i < N * N; i++) {
    cells.push(new Cell(i + 1));
  }
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
