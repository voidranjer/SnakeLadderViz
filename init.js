const DIE_SIZE = 6;
let N = 1;
let infile = {};
const cells = [];

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
  const n = parseInt(lines[0], 10);
  N = n;

  // Initialize an object to store the pairs
  const pairsObject = {};

  // Loop through the remaining lines to extract pairs
  for (let i = 1; i < lines.length; i++) {
    // Split each line into two numbers
    const [key, value] = lines[i].trim().split(" ").map(Number);

    // Add the pair to the object
    pairsObject[key] = value;
  }

  infile = pairsObject;

  // Log the result (you can do whatever you want with the object)
  // console.log("Number of Pairs:", n);
  // console.log("Pairs Object:", pairsObject);

  // Return the result if needed
  // return { n, pairsObject };
}
