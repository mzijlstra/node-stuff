#!/usr/bin/env node

(function () {
    'use strict';
    var fs = require('fs'),
        argv = process.argv,
        vm = require('vm'),
        readOpt = { 'encoding': 'utf-8' },
        file,
        ctx,
        JSLINT;

    // load JSLINT from it's file
    try {
        // turn on stupid because sync methods is appropriate
        /*jslint stupid: true */
        file = fs.readFileSync('jslint-2014-07-08.js', readOpt);
        /*jslint stupid: false */
        ctx = vm.createContext();

        // interpret the plain js file
        vm.runInContext(file, ctx);

        // retireve the JSLINT function from it
        JSLINT = ctx.JSLINT;
    } catch (err) {
        console.log('error opening jslint:\n' + err);
        process.exit(1);
    }


    // get rid of 'node' and 'jslint.js'
    argv.shift();
    argv.shift();

    // get the contents of each argv file and JSLINT it
    argv.forEach(function (entry) {
        try {
            /*jslint stupid: true */
            var data = fs.readFileSync(entry, readOpt),
                options = { node: true };
            /*jslint stupid: false */

            // fix node.js executables by removing hash bang first line
            /*jslint regexp: true*/
            data = data.replace(/^\#\!.*/, "");
            /*jslint regexp: false*/

            if (!JSLINT(data, options)) {
                console.log(JSLINT.error_report(JSLINT.data()));
            }
            console.log(JSLINT.report(JSLINT.data()));
        } catch (err) {
            console.log('error opening provided file: ' + entry);
            console.log(err);
        }
    });
}());
