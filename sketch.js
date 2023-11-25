const DIE_SIZE = 6;
const N = 5;
const adj = JSON.parse("[[1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 7], [3, 4, 5, 6, 7, 8], [4, 5, 6, 7, 8, 9, 20], [5, 6, 7, 8, 9, 10], [6, 7, 8, 9, 10, 11], [7, 8, 9, 10, 11, 12], [8, 9, 10, 11, 12, 13], [9, 10, 11, 12, 13, 14], [10, 11, 12, 13, 14, 15], [11, 12, 13, 14, 15, 16], [12, 13, 14, 15, 16, 17], [13, 14, 15, 16, 17, 18], [14, 15, 16, 17, 18, 19], [15, 16, 17, 18, 19, 20], [16, 17, 18, 19, 20, 21], [17, 18, 19, 20, 21, 22], [18, 19, 20, 21, 22, 23], [19, 20, 21, 22, 23, 24], [20, 21, 22, 23, 24, 25], [21, 22, 23, 24, 25], [22, 23, 24, 25], [23, 24, 25], [24, 25], [25], []]");
const infile = { 4: 20, 12: 9 };
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

  Cell.drawSearchPath();
}

function mouseClicked() {
  for (let cell of cells) {
    cell.handleClick();
  }
}
