var { getWriteFileStream, readInput } = require("../helpers");

const FILE_INPUT = "./day05/input.txt";
const FILE_OUTPUT = "./day05/output.txt";

function getSchemaAndInstructions(content) {
  return content.split("\n\n");
}

function stringToCratesArray(str) {
  return str
    .replace(/( {4})/gm, "[ ]")
    .replace(/[\[\]]/gm, "")
    .split(" ");
}

function getStacks(schema) {
  const matrix = setupMatrix(schema);
  const stacks = [];
  const stackSize = matrix[0].length;
  for (var i = 0; i < stackSize; i++) {
    stacks.push(matrix.map((stack) => stack[i]).filter((e) => e !== ""));
  }
  return stacks;
}

function getMoves(operations) {
  const moves = operations.split("\n");
  return moves.map((move) => {
    const parseMove = move.split(" ");
    return [parseMove[1], parseMove[3], parseMove[5]];
  });
}

function setupMatrix(schema) {
  const levels = schema.split("\n");
  const matrix = [];
  for (var i = 0; i < levels.length - 1; i++) {
    const crates = stringToCratesArray(levels[i]);
    matrix.push(crates);
  }
  return matrix;
}

// DEBUG
function write(str, stream = null) {
  if (!stream) {
    console.log(str);
  } else {
    stream.write(str + "\n");
  }
}

function renderStacks(stacks, stream = null) {
  const temp = [...stacks];
  const highestLevel = temp.reduce(
    (max, curr) => (curr.length > max ? curr.length : max),
    0
  );
  for (
    var level = highestLevel - 1, crateLevel = "";
    level >= 0;
    level--, crateLevel = ""
  ) {
    for (var i = 0; i < temp.length; i++) {
      const pileSize = temp[i].length;
      const crate =
        pileSize >= level ? temp[i][pileSize - 1 - level] : undefined;
      crateLevel += !crate ? "    " : `[${crate}] `;
    }
    write(crateLevel, stream);
  }
  for (var i = 0, ids = ""; i < temp.length; i++) {
    ids += ` ${i + 1} ${i + 1 !== temp.length ? " " : ""}`;
  }
  write(ids, stream);
  write("\n", stream);
}

function pickCrates(amount, stack) {
  const crates = [...stack];
  const modifiedStack = crates.splice(amount);
  return [crates.reverse(), modifiedStack];
}

function dropCrates(crates, stack) {
  const temp = [...stack];
  temp.unshift(...crates);
  return temp;
}

function moveCrates(amount, from, to, stacks) {
  const temp = [...stacks];
  const [crates, updStack] = pickCrates(amount, temp[from - 1]);
  temp[from - 1] = updStack;
  temp[to - 1] = dropCrates(crates, temp[to - 1]);
  return temp;
}

async function main(useStream = false) {
  const content = await readInput(FILE_INPUT);
  const stream = useStream
    ? getWriteFileStream(FILE_OUTPUT, { flag: "a" })
    : null;
  const [schema, operations] = getSchemaAndInstructions(content);
  let stacks = getStacks(schema);
  let moves = getMoves(operations);
  renderStacks(stacks, stream);
  moves.forEach((move) => {
    const [amount, from, to] = move;
    write(`move ${amount} from ${from} to ${to}`, stream);
    stacks = moveCrates(amount, from, to, stacks);
    renderStacks(stacks, stream);
  });
  console.log(stacks.map((stack) => stack[0]).join(""));
}

main(true);
