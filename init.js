const DIE_SIZE = 6;
let N = 1;
let infile = {};
let cells = [];

function init() {
  document.getElementById("submitBtn").onclick = loadInfile;

  document.getElementById("myTextArea").value = `10
8 52
6 80
26 42
2 72
51 19
39 11
37 29
81 3
59 5
79 23
53 7
43 33
77 21
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
