var { readInput } = require("../helpers");

const FILE_INPUT = "./day06/input.txt";

const PACKET_MARKER = 4;
const MESSAGE_MARKER = 14;

function hasRepeatedChars(str, markerSize = PACKET_MARKER) {
  let found = false;
  let idx = markerSize - 1;
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

function getMarker(content, markerSize = PACKET_MARKER) {
  let pointer = 0;
  const inputLength = content.length;
  let repeatedFound = false;
  do {
    const stream = content.slice(pointer, pointer + markerSize);
    [repeatedFound, idx] = hasRepeatedChars(stream, markerSize);
    pointer += idx;
  } while (repeatedFound && pointer < inputLength);
  return pointer;
}

async function main(version = 1) {
  const content = await readInput(FILE_INPUT);
  console.log(content);
  console.log(
    getMarker(content, version === 1 ? PACKET_MARKER : MESSAGE_MARKER)
  );
}

main(1);
main(2);
