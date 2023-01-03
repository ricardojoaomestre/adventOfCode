var { readInput } = require("../helpers");

const FILE_INPUT = "./day03/input.txt";

async function main() {
  const content = await readInput(FILE_INPUT);
  console.log(content);
}

main();
