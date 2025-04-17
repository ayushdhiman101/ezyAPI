const { v4: uuidv4 } = require("uuid");

function generateID() {
  return uuidv4().split("-")[0]; // short & unique
}

module.exports = generateID;
