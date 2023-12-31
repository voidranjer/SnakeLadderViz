const DIE_SIZE = 6;
let N = 1;
let infile = {};

function init() {
  document.getElementById("submitBtn").onclick = loadInfile;

  document.getElementById("myTextArea").value = `10
4 36
52 29
79 68
`;

  loadInfile();
}

function loadInfile() {
  const raw = document.getElementById("myTextArea").value;

  // Split the input string into an array of lines
  const lines = raw.trim().split("\n");

  // Extract the first line as the number of pairs (n)
  N = parseInt(lines[0], 10);

  // Reset infile
  infile = {};

  // Loop through the remaining lines to extract pairs
  for (let line of lines) {
    const keyAndValue = line.trim().split(" ").map(Number);

    if (keyAndValue.length == 2) {
      // Add the pair to the object
      const [key, value] = keyAndValue;
      infile[key] = value;
    }
  }

  resetSketch();
}

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
