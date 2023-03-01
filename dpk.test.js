const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given the falsy value input", () => {
    let trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");

    trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal 'secrect' when given input {partitionKey: \"secrect\"}", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "secrect"});
    expect(trivialKey).toBe("secrect");
  });

  it("Returns the string when given any input that not includes partitionKey", () => {
    let trivialKey = deterministicPartitionKey(5);
    expect(typeof trivialKey).toBe("string");

    trivialKey = deterministicPartitionKey(-5);
    expect(typeof trivialKey).toBe("string");

    trivialKey = deterministicPartitionKey(true);
    expect(typeof trivialKey).toBe("string");

    trivialKey = deterministicPartitionKey({anyKey: "secrect"});
    expect(typeof trivialKey).toBe("string");
  });

  it("Returns the result 128 when given any input that not includes partitionKey", () => {
    let trivialKey = deterministicPartitionKey(5);
    expect(trivialKey.length).toBe(128);

    trivialKey = deterministicPartitionKey(-5);
    expect(trivialKey.length).toBe(128);

    trivialKey = deterministicPartitionKey(true);
    expect(trivialKey.length).toBe(128);

    trivialKey = deterministicPartitionKey({anyKey: "secrect"});
    expect(trivialKey.length).toBe(128);
  });

  it("Returns the specific value when given specific input", () => {
    const trivialKey = deterministicPartitionKey("test");
    expect(trivialKey).toBe("0fa3727b22cbb0a5271dddfcb7d414a1a512284913ccd690b198751de8100b1ea1935c1b63c35837696f8e73709431de092894581bec9bbfe6532106733af6d8");
  });
});
