var { readInput } = require("../helpers");

const INPUT_FILE = "./day02/input.txt";

async function getPlays() {
  const input = await readInput(INPUT_FILE);
  return input.split("\n").map((sequence) => sequence.split(" "));
}

const compare = (a, b) =>
  (a < b && Math.abs(a - b) !== 2) || (Math.abs(a - b) === 2 && a > b)
    ? 0
    : a === b
    ? 3
    : 6;

function result(a, b) {
  const points = {
    A: 1,
    X: 1,
    B: 2,
    Y: 2,
    C: 3,
    Z: 3,
  };
  return [
    compare(points[a], points[b]) + points[a],
    compare(points[b], points[a]) + points[b],
  ];
}

function result2(a, b) {
  const outcome = {
    A: {
      win: "C",
      lose: "B",
    },
    B: {
      win: "A",
      lose: "C",
    },
    C: {
      win: "B",
      lose: "A",
    },
  };
  switch (b) {
    case "X": // lose
      return result(a, outcome[a].win);
    case "Y": //draw
      return result(a, a);
    case "Z": // win
    default:
      return result(a, outcome[a].lose);
  }
}

function getPoints(plays, version = 1) {
  const fn = version === 1 ? result : result2;
  return plays.reduce(
    (acc, [a, b]) => {
      const [p1, p2] = fn(a, b);
      return [acc[0] + p1, acc[1] + p2];
    },
    [0, 0]
  );
}

async function main(version) {
  const plays = await getPlays();
  const [opponent, me] = getPoints(plays, version);
  console.log(me);
}

main(1);
main(2);
