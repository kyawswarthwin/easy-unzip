# easy-unzip

## Installation

    npm i easy-unzip

## Usage

```js
'use strict';

const unzip = require('easy-unzip');

unzip('android-debug.apk', 'META-INF/MANIFEST.MF')
  .then(console.log)
  .catch(console.error);
```
