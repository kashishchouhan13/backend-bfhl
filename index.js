const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST /bfhl
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  const userId = "john_doe_17091999"; // Example user ID
  const email = "john@xyz.com";
  const rollNumber = "ABCD123";

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = null;
  let isPrimeFound = false;

  // Parse the input array
  if (Array.isArray(data)) {
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
        if (isPrime(parseInt(item))) isPrimeFound = true;
      } else if (typeof item === "string") {
        alphabets.push(item);
        if (item === item.toLowerCase()) {
          if (
            !highestLowercaseAlphabet ||
            item > highestLowercaseAlphabet
          ) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });
  }

  // File handling
  const fileValid = !!file_b64;
  const fileMimeType = fileValid ? "application/octet-stream" : null;
  const fileSizeKb = fileValid ? Math.ceil(file_b64.length / 1024) : null;

  res.json({
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

// GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});
app.get("/", (req, res) => {
  res.send("Welcome to the Backend API");
});


// Prime number checker
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
