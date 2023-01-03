var { readInput } = require("../helpers");

const FILE_INPUT = "./day04/input.txt";

function getRanges(str) {
  const ranges = str.split(",");
  return [
    ranges[0].split("-").map((section) => parseInt(section, 10)),
    ranges[1].split("-").map((section) => parseInt(section, 10)),
  ];
}

function isWithinRange(r1, r2) {
  return r1[0] <= r2[0] && r1[r1.length - 1] >= r2[r2.length - 1];
}

function isRangeWithinEachOther(range1, range2) {
  return isWithinRange(range1, range2) || isWithinRange(range2, range1);
}

function isValueWithinRange(v, r) {
  return v >= r[0] && v <= r[r.length - 1];
}

function overlaps(range1, range2) {
  return (
    isValueWithinRange(range1[0], range2) ||
    isValueWithinRange(range1[range1.length], range2) ||
    isValueWithinRange(range2[0], range1) ||
    isValueWithinRange(range2[range2.length], range1)
  );
}

async function main(version = 1) {
  const content = await readInput(FILE_INPUT);
  const assignments = content.split("\n");
  if (version === 1) {
    const fullyContained = assignments.reduce((sum, assignment) => {
      const [range1, range2] = getRanges(assignment);
      const inRange = isRangeWithinEachOther(range1, range2);
      return inRange ? sum + 1 : sum;
    }, 0);
    console.log(fullyContained);
  } else {
    const overlappings = assignments.reduce((sum, assignment) => {
      const [range1, range2] = getRanges(assignment);
      const isOverlapping = overlaps(range1, range2);
      return isOverlapping ? sum + 1 : sum;
    }, 0);
    console.log(overlappings);
  }
}

main(1);
main(2);
