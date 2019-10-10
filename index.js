'use strict';

var Url = require('url');
var request = require('request');
var extractLink = require('./helper');
var does_it_render = require('./request');

module.exports = function (url, callback) {
    var p = Url.parse(url);
    var root = p.protocol + "//" + p.host;
    var ico = root + "/favicon.ico";

    // Check the root of the web site.
    does_it_render(ico, function (err, renders) {
        if (err) return callback(err);
        if (renders) return callback(null, ico);

        // Check for <link rel="icon" href="???"> tags to indicate
        // the location of the favicon.
        request(root, function (err, res, body) {
            var icon = extractLink(url, body);
            if (icon) {
                return callback(null, icon);
            }
            // No favicon could be found.
            return callback(null, null);
        });
    });
};


