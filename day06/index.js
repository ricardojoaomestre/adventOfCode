var { readInput } = require("../helpers");

const FILE_INPUT = "./day06/input.txt";

function hasRepeatedChars(str) {
  let found = false;
  let idx = 3;
  for (var j = 0; j < str.length - 1 && !found; j++) {
    for (var i = j + 1; i < str.length && !found; i++) {
      if (str[j] === str[i]) {
        found = true;
        idx = j;
      }
    }
  }
  return [found, idx + 1];
}

function getMarker(content) {
  let pointer = 0;
  const inputLength = content.length;
  let repeatedFound = false;
  do {
    const stream = content.slice(pointer, pointer + 4);
    [repeatedFound, idx] = hasRepeatedChars(stream);
    pointer += idx;
  } while (repeatedFound && pointer < inputLength);
  return pointer;
}

async function main() {
  const content = await readInput(FILE_INPUT);
  console.log(content);
  console.log(getMarker(content));
}

main();
