var { readInput } = require("../helpers");

const FILE_INPUT = "./day08/input.txt";

function toMatrix(content) {
  const lines = content.split("\n");
  const matrix = Array(lines.length);

  for (var l = 0; l < lines.length; l++) {
    matrix[l] = lines[l].split("");
  }
  return matrix;
}

function getVisibility(matrix, from, to) {
  const { fromL, fromC } = from;
  const { toL, toC } = to;
  const direction = fromL === toL ? "horizontal" : "vertical";
  const inc =
    (direction === "horizontal" && (fromC < toC ? 1 : -1)) ||
    (direction === "vertical" && (fromL < toL ? 1 : -1));
  let min = 0;

  switch (direction) {
    case "horizontal":
      for (
        var i = fromC;
        (inc > 0 && i < toC) || (inc < 0 && i > toC);
        min = matrix[fromL][i] > min ? matrix[fromL][i] : min, i += inc
      );
      break;
    case "vertical":
      for (
        var i = fromL;
        (inc > 0 && i < toL) || (inc < 0 && i > toL);
        min = matrix[i][fromC] > min ? matrix[i][fromC] : min, i += inc
      );
      break;
  }
  return min;
}

function isVisible(matrix, l, c) {
  const fromTop = getVisibility(
    matrix,
    { fromL: 0, fromC: c },
    { toL: l, toC: c }
  );
  const fromBottom = getVisibility(
    matrix,
    { fromL: matrix.length - 1, fromC: c },
    { toL: l, toC: c }
  );
  const fromLeft = getVisibility(
    matrix,
    { fromL: l, fromC: 0 },
    { toL: l, toC: c }
  );
  const fromRight = getVisibility(
    matrix,
    { fromL: l, fromC: matrix.length - 1 },
    { toL: l, toC: c }
  );
  const testValue = matrix[l][c];
  return (
    fromTop < testValue ||
    fromBottom < testValue ||
    fromLeft < testValue ||
    fromRight < testValue
  );
}

function recursiveHorizontalSearch(matrix, l, c, originValue, inc, score) {
  if ((inc > 0 && c + inc >= matrix[0].length) || (inc < 0 && c + inc < 0))
    return score;
  if (matrix[l][c + inc] >= originValue) return score + 1;
  return recursiveHorizontalSearch(
    matrix,
    l,
    c + inc,
    originValue,
    inc,
    score + 1
  );
}

function recursiveVerticalSearch(matrix, l, c, originValue, inc, score) {
  if ((inc > 0 && l + inc >= matrix.length) || (inc < 0 && l + inc < 0))
    return score;
  if (matrix[l + inc][c] >= originValue) return score + 1;
  return recursiveVerticalSearch(
    matrix,
    l + inc,
    c,
    originValue,
    inc,
    score + 1
  );
}

function scenicScore(matrix, l, c) {
  const up = recursiveVerticalSearch(matrix, l, c, matrix[l][c], -1, 0);
  const down = recursiveVerticalSearch(matrix, l, c, matrix[l][c], 1, 0);
  const left = recursiveHorizontalSearch(matrix, l, c, matrix[l][c], -1, 0);
  const right = recursiveHorizontalSearch(matrix, l, c, matrix[l][c], 1, 0);
  // console.log(
  //   `${l}-${c}: up: ${up}; down: ${down}; left: ${left}; right: ${right} = ${
  //     up * down * left * right
  //   }`
  // );
  return up * down * left * right;
}

async function main(version = 1) {
  const content = await readInput(FILE_INPUT);
  const matrix = toMatrix(content);

  if (version === 1) {
    let count = 0;
    for (var l = 1; l < matrix.length - 1; l++) {
      for (var c = 1; c < matrix[l].length - 1; c++) {
        count += isVisible(matrix, l, c) ? 1 : 0;
      }
    }
    return count + matrix.length * 2 + (matrix[0].length - 2) * 2;
  }
  if (version === 2) {
    let max = 0;
    for (var l = 1; l < matrix.length - 1; l++) {
      for (var c = 1; c < matrix[l].length - 1; c++) {
        const score = scenicScore(matrix, l, c);
        // console.log(`${l}-${c} has scenicScore of: ${score}`);
        if (score > max) max = score;
      }
    }
    // console.log(scenicScore(matrix, 3, 2));
    return max;
  }
}

// main(1).then((response) => console.log(response));
main(2).then((response) => console.log(response));
