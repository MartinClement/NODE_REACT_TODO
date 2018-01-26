// Node Core
const fs = require('fs');
// Global
const config = require('config');

/* *** *** IMPORTS *** *** */

class Logger {

  constructor() {
    this.folderName = config.logger.folderName;
    this.fileName = config.logger.fileName;
    this.outputPath = `${this.folderName}/${this.fileName}`;
  }

  log(message) {
    const date = new Date;
    const info = date + '-' + message + '\n';

    // Check if Export Folder Exist
    if (!fs.existsSync(this.folderName))
      fs.mkdirSync(this.folderName);

    fs.appendFileSync(this.outputPath, info);
  }
}

module.exports = Logger;
