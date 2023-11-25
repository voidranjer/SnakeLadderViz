class Cell {
  static searchPath = [1];
  static validNexts = [];
  static hoveredIndex = -1;

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

    this.clickedOnce = false;

    // Initialize valid nexts
    if (Cell.searchPath.length == 1) Cell.updateValidNexts();
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

  static updateValidNexts() {
    if (Cell.searchPath.length == 0) return;

    const newValidNexts = [];
    for (let i = 1; i <= 6; i++) {
      const targetIndex = Cell.searchPath[Cell.searchPath.length - 1] + i;
      if (targetIndex <= N * N) newValidNexts.push(targetIndex);
      // Account for ladders/snakes
      // if (targetIndex in infile && this.index == infile[targetIndex]) return true;
    }

    Cell.validNexts = newValidNexts;
  }

  static drawSearchPath() {
    if (Cell.searchPath.length == 0) return;

    const hoveredCell = cells[Cell.hoveredIndex];
    const lastCell = cells[Cell.searchPath[Cell.searchPath.length - 1]];

    // If currently hovering over a valid next position:
    if (Cell.validNexts.includes(Cell.hoveredIndex)) {
      cursor("pointer");

      // Draw next indicators from hovered cell if hovered cell is a valid next pos
      hoveredCell.drawOutgoingArrows();

      // Draw connection line from latest cell to hovered cell
      drawArrowWithTip(lastCell.centerX, lastCell.centerY, hoveredCell.centerX, hoveredCell.centerY, "blue", 5);

      // Hover animations
      fill(0, 0, 0, 50);
      square(hoveredCell.x, hoveredCell.y, hoveredCell.squareWidth);
    }

    // Otherwise, default to drawing next indicators from latest cell in search path
    else {
      cursor("default");
      lastCell.drawOutgoingArrows();
    }

    // Draw valid nexts
    for (let index of Cell.validNexts) {
      const { centerX, centerY } = cells[index];

      stroke("black");
      strokeWeight(1);
      fill("cyan");

      if (index == Cell.hoveredIndex) {
        strokeWeight(3);
        stroke("blue");
      }
      circle(centerX, centerY, 25);
    }

    // Draw search path
    stroke("blue");
    noFill();
    beginShape();
    for (let index of Cell.searchPath) {
      strokeWeight(3);
      const { centerX, centerY } = cells[index];
      vertex(centerX, centerY);
    }
    endShape();
    strokeWeight(1);

    // Stop drawing floating line if the newest cell is the last cell
    if (Cell.searchPath[Cell.searchPath.length - 1] == N * N) {
      // window.alert("Well done! You get a candy :>");
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ?autoplay=1&mute=1", "_blank");
      Cell.searchPath = [1];
      Cell.updateValidNexts();
      return;
    }

    // Follow proper search path shape
    // beginShape();
    // let currentIndex = Cell.searchPath[Cell.searchPath.length - 1];
    // while (currentIndex != Cell.hoveredIndex) {
    //   if (currentIndex > Cell.hoveredIndex) currentIndex--;
    //   else currentIndex++;
    //   const { centerX, centerY } = cells[currentIndex];
    //   vertex(centerX, centerY);
    // }
    // // vertex(mouseX, mouseY);
    // endShape();
  }

  handleClick() {
    // Targets only the cell being hovered (other cells should not execute this function)
    if (!this.isHovering()) return;

    // Highlight the cell
    if (!Cell.searchPath.includes(this.index)) this.clickedOnce = true;

    // This cell is already in the search path and it's not the last element
    if (Cell.searchPath.includes(this.index)) {
      window.alert("Naughty naughty! What are you trying to do?");
      return;
    }

    // We're taking a ladder/snake
    if (this.index in infile) {
      Cell.searchPath.push(this.index);
      Cell.searchPath.push(infile[this.index]);
    }

    // No ladder/snake, just a normal move
    else {
      // Follow proper search path shape
      let currentIndex = Cell.searchPath[Cell.searchPath.length - 1];
      while (currentIndex != this.index) {
        if (currentIndex > this.index) currentIndex--;
        else currentIndex++;
        Cell.searchPath.push(currentIndex);
      }
    }

    Cell.updateValidNexts();
  }

  isHovering() {
    return mouseX > this.x && mouseX < this.x + this.squareWidth && mouseY > this.y && mouseY < this.y + this.squareWidth;
  }

  isInSearchPath() {
    return Cell.searchPath.includes(this.index);
  }

  isValidNextPosition() {
    return Cell.validNexts.includes(this.index);
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
    drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "blue", 5);
  }

  drawOutgoingArrows() {
    for (let i = 1; i <= 6; i++) {
      const destIndex = this.index + i;
      if (destIndex > N * N) break;

      const destCell = cells[destIndex];

      drawArrowWithTip(this.centerX, this.centerY, destCell.centerX, destCell.centerY, "green", 5);
    }
  }

  draw() {
    stroke("black");
    fill("white");

    // Set/unset hovered index
    if (this.isHovering()) Cell.hoveredIndex = this.index;
    else if (this.index == Cell.hoveredIndex) Cell.hoveredIndex = -1;

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

    // Visited cells
    if (this.clickedOnce) {
      fill("blue");
      circle(this.centerX, this.centerY, 25);
      noFill();
    }

    // if (Cell.searchPath.length == 1) {
    //   this.drawNextArrow();
    // if (this.isHovering()) this.drawOutgoingArrows();
    // }
  }
}
