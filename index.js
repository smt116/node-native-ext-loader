var path = require("path");

module.exports = function(content) {
  const defaultConfig = {
    rewritePath: undefined
  };

  const config = Object.assign(defaultConfig, this.query);
  const fileName = path.basename(this.resourcePath);

  if (this.emitFile) {
    this.emitFile(fileName, content, false);
    this.addDependency(this.resourcePath);
  } else {
    throw new Error("emitFile function is not available");
  }

  if (config.rewritePath) {
    let filePath;

    if (config.rewritePath === "./" || config.rewritePath === ".\\") {
      filePath = JSON.stringify(config.rewritePath + fileName);
    } else {
      filePath = JSON.stringify(path.join(config.rewritePath, fileName));
    }

    return (
      "try { global.process.dlopen(module, " +
      filePath +
      "); } " +
      "catch(exception) { throw new Error('Cannot open ' + " +
      filePath +
      " + ': ' + exception); };"
    );
  } else {
    return (
      "const path = require('path');" +
      "const filePath = path.resolve(__dirname, " +
      JSON.stringify(fileName) +
      ");" +
      "try { global.process.dlopen(module, filePath); } " +
      "catch(exception) { throw new Error('Cannot open ' + filePath + ': ' + exception); };"
    );
  }
};

module.exports.raw = true;
