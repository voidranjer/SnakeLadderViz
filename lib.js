function drawGrid() {
  function indexToIJ(index) {
    if (index < 1 || index > N * N) {
      // Index out of bounds
      return null;
    }

    // Convert the 1D index to 2D coordinates
    const i = Math.floor((index - 1) / N);
    const j = (index - 1) % N;

    return { i, j };
  }
  
  function ijToXY(i, j) {
    const originX = (j * cellSize);
    const originY = (i * cellSize);
    const centerX = originX + (cellSize / 2);
    const centerY = originY + (cellSize / 2);
    return { originX, originY, centerX , centerY };
  }

  
  let cellSize = width / N;
  let counter = 1;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // if(i%2 == 0) j = N -j;
      
      const { originX, originY, centerX , centerY } = ijToXY(i, j);
      
      stroke(0);
      noFill();
      rect(originX, originY, cellSize, cellSize);
      
      // Label the box with its position
      textAlign(CENTER, CENTER);
      fill(0);
      textSize(12);
      text(counter, centerX, centerY);
      text(`${i}, ${j}`, originX + 15, originY + 10);
      
      if (counter + 1 <= N * N) {
        let arrowCounter = 0;
        for (const outNode of adj[counter]) {
          const {i: nextI, j: nextJ} = indexToIJ(outNode);
          const nextPos = ijToXY(nextI, nextJ);
          if (arrowCounter < 6) {
            // drawArrowWithTip(centerX + cellSize*0.2, centerY - cellSize*0.2, nextPos.centerX - cellSize*0.2, nextPos.centerY - cellSize*0.2);  
            arrowCounter++;
          } else {
            fill(0,255,0);
            if (outNode < counter) fill(255,0,0);
            drawArrowWithTip(centerX, centerY, nextPos.centerX, nextPos.centerY);
            fill(0);
          }
          
        }
      }
      
      
      counter++;
    }
  }
}