class Cell {
  static searchPath = [1];

  constructor(index) {
    this.index = index;

    const { i, j } = Cell.indexToIJ(index);
    this.i = i;
    this.j = j;

    this.squareWidth = Math.min(width, height) / N;
    this.x = i % 2 == 0 ? this.j * this.squareWidth : width - (this.j + 1) * this.squareWidth;
    this.y = height - (this.i + 1) * this.squareWidth;

    this.centerX = this.x + this.squareWidth / 2;
    this.centerY = this.y + this.squareWidth / 2;
  }

  static indexToIJ(index) {
    if (index < 1 || index > N * N) {
      // Index out of bounds
      return null;
    }

    // Convert the 1D index to 2D coordinates
    const i = Math.floor((index - 1) / N);
    const j = (index - 1) % N;

    return { i, j };
  }

  static drawSearchPath() {
    if (Cell.searchPath.length == 0) return;

    stroke("blue");
    strokeWeight(5);
    noFill();
    beginShape();
    for (let index of Cell.searchPath) {
      const { centerX, centerY } = cells[index];
      vertex(centerX, centerY);
    }

    // Only draw floating line if the newest cell is not the last cell
    if (!(Cell.searchPath[Cell.searchPath.length - 1] == N * N)) {
      vertex(mouseX, mouseY);
    }

    endShape();
    strokeWeight(1);
  }

  handleClick() {
    if (!this.isHovering()) return;

    // This cell is already in the search path and it's not the last element
    if (Cell.searchPath.includes(this.index)) {
      window.alert("Naughty boy!");
      return;
    }

    Cell.searchPath.push(this.index);
    if (this.index in infile) {
      Cell.searchPath.push(infile[this.index]);
    }
  }

  isHovering() {
    return mouseX > this.x && mouseX < this.x + this.squareWidth && mouseY > this.y && mouseY < this.y + this.squareWidth;
  }

  isInSearchPath() {
    return Cell.searchPath.includes(this.index);
  }

  isValidNextPosition() {
    const lastCell = cells[Cell.searchPath[Cell.searchPath.length - 1]];

    for (let i = 1; i <= 6; i++) {
      const targetIndex = i + lastCell.index;
      if (this.index == targetIndex) return true;

      // Account for ladders/snakes
      if (targetIndex in infile && this.index == infile[targetIndex]) return true;
    }

    return false;
  }

  drawShortcuts() {
    if (this.index in infile) {
      // for (let i of infile[this.index]) {
      //   const destCell = cells[i];
      //   drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, this.isInSearchPath() || this.isHovering() ? "green" : "red", 25);
      // }
      const destCell = cells[infile[this.index]];
      drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, this.isInSearchPath() || this.isHovering() ? "green" : "red", 25);
    }
  }

  drawNextArrow() {
    if (this.index == N * N) return;
    const destCell = cells[this.index + 1];
    drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "blue", 10);
  }

  drawOutgoingArrows() {
    for (let i = 1; i <= 6; i++) {
      const destIndex = this.index + i;
      if (destIndex > N * N) break;

      const destCell = cells[destIndex];

      drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "green");
    }
  }

  draw() {
    stroke(0);
    fill(255);

    if (this.isValidNextPosition()) {
      fill("lightgray");
    }

    if (this.isHovering()) {
      if (this.isValidNextPosition()) cursor(HAND);
      else cursor(CROSS);
    }

    if (this.isInSearchPath() || (this.isValidNextPosition() && this.isHovering())) {
      stroke("blue");
      fill("gray");
    }

    // Color first and last cells special
    if (this.index == 1 || this.index == N * N) fill("magenta");

    // Color latest cell in search path special
    if (this.index == Cell.searchPath[Cell.searchPath.length - 1]) fill("yellow");

    square(this.x, this.y, this.squareWidth);

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(12);
    text(this.index, this.x + 20, this.y + 20);

    if (this.isHovering()) {
      fill(0, 0, 255);
      text(`${this.i}, ${this.j}`, this.x + this.squareWidth - 20, this.y + 20);
    }
  }

  drawOverlay() {
    this.drawShortcuts();
    if (Cell.searchPath.length == 1) {
      this.drawNextArrow();
      // if (this.isHovering()) this.drawOutgoingArrows();
    }

    // Draw outgoing arrows from newest position
    if (this.index == Cell.searchPath[Cell.searchPath.length - 1]) this.drawOutgoingArrows();

    // Draw outgoing arrows on hovering valid next positions
    if (this.isValidNextPosition()) {
      if (this.isHovering()) this.drawOutgoingArrows();
    }
  }
}
