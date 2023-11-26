function setup() {
  resolution = Math.min(windowWidth, windowHeight);
  createCanvas(resolution, resolution);

  resetSketch();
}

function resetSketch() {
  Cell.reset();
}

function draw() {
  clear();
  Cell.drawAll();
}

function mouseClicked() {
  for (let cell of Cell.cells) {
    cell.handleClick();
  }
}
