const crypto = require("crypto");

// Keep constants outside function to reuse them across functions in the module
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Extract the hashing function to resuse them across functions in the module
const generateHashedData = (data) => crypto.createHash("sha3-512").update(data);

// Extract the partition key checking function for the clarity purpose
const transformPartitionKey = (input) => {
  let candidate;

  if (!input) return candidate;

  if (input.partitionKey) { // if the input contains the partitionKey then just keep it
    candidate = input.partitionKey;
  } else { // if the input does not contain the partitionKey then hash it
    const data = JSON.stringify(input);
    candidate = generateHashedData(data).digest("hex");
  }

  return candidate;
}

// Extract the transform candidate function for the clarity purpose
const transformCandidate = (input) => {
  let candidate = input;

  if (input) {
    if (typeof input !== "string") {
      candidate = JSON.stringify(input);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHashedData(candidate).digest("hex");
  }

  return candidate;
}

const deterministicPartitionKey = (event) => {
  const candidate = transformPartitionKey(event);
  return transformCandidate(candidate);
};

// Use module exports for the clarity purpose
module.exports = {
  deterministicPartitionKey
}