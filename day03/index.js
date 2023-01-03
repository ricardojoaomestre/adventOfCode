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

function findBadge(str1, str2, str3) {
  return str1
    .split("")
    .find((char) => str2.indexOf(char) !== -1 && str3.indexOf(char) !== -1);
}

async function main(version = 1) {
  const content = await readInput(FILE_INPUT);
  const ruckstacks = content.split("\n");
  let sum = 0;
  if (version === 1) {
    ruckstacks.forEach((ruckstack) => {
      const [p1, p2] = breakEven(ruckstack);
      const common = findCommon(p1, p2);
      const priority = getPriority(common);
      sum += priority;
    });
    console.log(sum);
  } else {
    for (let i = 0; i < ruckstacks.length; i += 3) {
      const p1 = ruckstacks[i];
      const p2 = ruckstacks[i + 1];
      const p3 = ruckstacks[i + 2];
      const badge = findBadge(p1, p2, p3);
      const priority = getPriority(badge);
      sum += priority;
      console.log(
        `Group ${
          i / 3 + 1
        }\n${p1}\n${p2}\n${p3}\nBadge: ${badge} - ${priority}\nTotal: ${sum}`
      );
    }
    console.log(sum);
  }
}

// main(1);
main(2);
