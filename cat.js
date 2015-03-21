#!/usr/bin/env node

(function () {
    'use strict';
    var fs   = require('fs'), argv = process.argv;
    // get rid of 'node' and 'cat.js'
    argv.shift();
    argv.shift();

    // get the contents of each file and print to stdout
    argv.forEach(function (entry) {
        try {
            fs.readFile(entry, { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(data);
            });
        } catch (err) {
            process.stderr.write(err);
        }
    });
}());
