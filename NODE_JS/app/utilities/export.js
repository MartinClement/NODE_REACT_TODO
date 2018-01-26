// Node Core
const fs   = require('fs');
const path = require('path');
// Node Package
const config = require('config');
// DB
const DAO = require('../dao');

/* *** *** IMPORTS *** *** */

function streamFile(result, outputPath) {
  // Stream need to be String
  const streamResult = result.toString();
  const writeStream  = fs.createWriteStream(outputPath);

  writeStream.write(streamResult);
  writeStream.end( () => console.log(streamResult));

  // Chain with .pipe the Read & Write Stream
  writeStream
    .on('error', () => {
      console.error('STREAM ERROR');
      process.exit(1);
    })
    .on('finish', () => {
      const appDir = path.dirname(require.main.filename);
      const filePath = `${appDir.slice(0,-3)}${outputPath}`
    });
}

function exportDB(fileName) {
  if(!fileName)
    return console.error('file_name argument is required');

  DAO.find()
    .then(result => {
      const dir = config.export.folderName;
      const name = fileName.split('=')[1];
      const outputPath = `${dir}/${name}`;

      // Check if Export Folder existsSync
      if (!fs.existsSync(dir))
        fs.mkdirSync(dir);

      streamFile(result, outputPath);

      //fs.writeFileSync(outputPath, result);

      // Gracefully Kill the process
      // process.exit(0);

    })
    .catch(err => console.error(err));
}

module.exports = exportDB;
