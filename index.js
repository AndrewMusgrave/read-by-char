const fs = require("fs");
const readline = require("readline");

module.exports = function readByChar(path, onChar, onClose) {
  let line = 1;
  new Promise((resolve, reject) => {
    const instream = fs.createReadStream(path);
    instream.on("error", error => {
      reject(error);
    });

    const rl = readline.createInterface({
      input: instream,
      terminal: false
    });

    rl.on("line", text => {
      handleLine(text);
    });

    rl.on("close", () => {
      if (typeof onClose === "function") {
        onClose();
      }

      resolve();
    });
  });

  function handleLine(text) {
    if (typeof onChar !== "function") return;

    for (let i = 0; i < text.length; i++) {
      onChar(text[i], i + 1, line);
    }

    line++;
  }
};
