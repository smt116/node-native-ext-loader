var path = require("path");

module.exports = function(content) {
  const defaultConfig = {
    basePath: [],
    emit: true
  };

  const config = Object.assign(defaultConfig, this.query);
  const fileName = path.basename(this.resourcePath);

  if (config.emit) {
    if (this.emitFile) {
      this.emitFile(fileName, content, false);
    } else {
      throw new Error("emitFile function is not available");
    }
  }
  
  this.addDependency(this.resourcePath);

  const filePathArray = config.basePath.concat(fileName);
  const filePath = JSON.stringify(filePathArray).slice(1, -1);

  return (
    "const path = require('path');" +
      "const filePath = path.resolve(process.cwd(), " +
      filePath +
      ");" +
      "try { global.process.dlopen(module, filePath); } " +
      "catch(exception) { throw new Error('Cannot open ' + filePath + ': ' + exception); };"
  );
};

module.exports.raw = true;
