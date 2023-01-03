var { readInput } = require("../helpers");

const FILE_INPUT = "./day03/input.txt";

console.log("Creating priorities...");
// build up priority array to easier assess the character priorities
const priorities = [];
for (var i = 97; i <= 122; i++) {
  priorities.push(String.fromCharCode(i));
}
for (var i = 65; i <= 90; i++) {
  priorities.push(String.fromCharCode(i));
}

function getPriority(char) {
  return priorities.indexOf(char) + 1;
}

function breakEven(str) {
  const size = str.length;
  const breakPoint = size / 2;
  return [str.substring(0, breakPoint), str.substring(breakPoint, size)];
}

function findCommon(str1, str2) {
  return str1.split("").find((char) => str2.indexOf(char) !== -1);
}

async function main() {
  const content = await readInput(FILE_INPUT);
  const ruckstacks = content.split("\n");
  let sum = 0;
  ruckstacks.forEach((ruckstack) => {
    const [p1, p2] = breakEven(ruckstack);
    const common = findCommon(p1, p2);
    const priority = getPriority(common);
    sum += priority;
  });
  console.log(sum);
}

main();
