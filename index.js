'use strict';

const yauzl = require('yauzl');

function unzip(filePath, fileName) {
  return new Promise((resolve, reject) => {
    try {
      yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
        if (err) throw err;
        zipfile.readEntry();
        zipfile.on('entry', entry => {
          if (entry.fileName === fileName) {
            zipfile.openReadStream(entry, (err, stream) => {
              if (err) throw err;
              const buf = [];
              stream.on('data', chunk => {
                buf.push(chunk);
              });
              stream.on('end', () => {
                resolve(Buffer.concat(buf));
              });
            });
          }
          zipfile.readEntry();
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = unzip;
