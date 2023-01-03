var fs = require("fs/promises");
async function readInput(file) {
  try {
    return await fs.readFile(file, { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readInput,
};
