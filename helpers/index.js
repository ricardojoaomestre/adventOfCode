var fs = require("fs");
var fsp = require("fs/promises");
async function readInput(file) {
  try {
    return await fsp.readFile(file, { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
}

function getWriteFileStream(file, options) {
  return fs.createWriteStream(file, options);
}

module.exports = {
  readInput,
  getWriteFileStream,
};
