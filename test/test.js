// Copyright 2014 Mark Cavage.  All rights reserved.
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

function runTests(directory) {
  fs.readdir(directory, (err, files) => {
    assert.ifError(err);

    console.dir(files);
    files.filter((f) => {
      return /\.test\.js$/.test(f);
    }).map((f) => {
      return path.join(directory, f);
    }).
      forEach(require);
  });
}

////////////////////
// Run All Tests

(function main() {
  runTests(__dirname);
  runTests(path.join(__dirname, 'controls'));
  runTests(path.join(__dirname, 'filters'));
  runTests(path.join(__dirname, 'messages'));
})();
