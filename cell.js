class Cell {
  static numToggled = 0;
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

    this.toggled = false;
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
    vertex(mouseX, mouseY);
    endShape();
    strokeWeight(1);
  }

  handleClick() {
    if (!this.isHovering()) return;

    // This cell is already in the search path and it's not the last element
    if (Cell.searchPath.includes(this.index) && Cell.searchPath[Cell.searchPath.length - 1] != this.index) {
      window.alert("Naughty boy!");
      return;
    }

    if (!this.toggled) {
      Cell.searchPath.push(this.index);
      this.toggled = true;
    } else {
      Cell.searchPath.pop();
      this.toggled = false;
    }

    Cell.numToggled += this.toggled ? -1 : 1;
    // this.toggled = !this.toggled;
  }

  isHovering() {
    return mouseX > this.x && mouseX < this.x + this.squareWidth && mouseY > this.y && mouseY < this.y + this.squareWidth;
  }

  drawShortcuts() {
    if (this.index in infile) {
      for (let i of infile[this.index]) {
        const destCell = cells[i];
        drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, this.toggled || this.isHovering() ? "green" : "red", 25);
      }
    }
  }

  drawNextArrow() {
    if (this.index == N * N) return;
    const destCell = cells[this.index + 1];
    drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "blue", 10);
  }

  drawOutgoingArrows() {
    // const outgoingEdges = adj[this.index];

    for (let i = 1; i <= 6; i++) {
      const destIndex = this.index + i;
      if (destIndex > N * N) break;

      const destCell = cells[destIndex];
      // if (outgoingEdges.includes(destIndex)) continue;

      drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "green");
    }

    // for (let edge of outgoingEdges) {
    //   const destCell = cells[edge];
    //   drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY);
    // }
  }

  draw() {
    stroke(0);
    fill(255);
    if (this.isHovering() || this.toggled) {
      stroke("blue");
      fill(200);
    }
    if (this.index == 1) fill("cyan");
    if (this.index == N * N) fill("magenta");
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
    if (Cell.numToggled == 0) {
      this.drawNextArrow();
      if (this.isHovering()) this.drawOutgoingArrows();
    }

    if (this.toggled) this.drawOutgoingArrows();
  }
}
