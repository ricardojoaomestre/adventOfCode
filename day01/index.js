var { readInput } = require("../helpers");

const INPUT_FILE = "./day01/input.txt";

async function getLoads() {
  const calories = await readInput(INPUT_FILE);
  let loads = [];
  let elfs = 0;
  let acc = 0;

  calories.split("\n").forEach((curr) => {
    if (curr === "") {
      loads[elfs++] = acc;
      acc = 0;
    } else {
      acc += parseInt(curr, 10);
    }
  });

  loads.sort((a, b) => b - a);
  return loads;
}

async function main() {
  const loads = await getLoads();
  console.log(loads[0]);
  console.log(loads[0] + loads[1] + loads[2]);
}

main();
