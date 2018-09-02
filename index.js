'use strict';

const yauzl = require('yauzl');

function unzip(filePath, pattern, flags = undefined) {
  return new Promise((resolve, reject) => {
    yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        reject(err);
      } else {
        zipfile.readEntry();
        zipfile.on('entry', entry => {
          if (RegExp(pattern, flags).test(entry.fileName)) {
            zipfile.openReadStream(entry, (err, stream) => {
              if (err) {
                reject(err);
              } else {
                const buf = [];
                stream.on('data', chunk => {
                  buf.push(chunk);
                });
                stream.on('end', () => {
                  resolve(Buffer.concat(buf));
                });
              }
            });
          }
          zipfile.readEntry();
        });
      }
    });
  });
}

module.exports = unzip;
