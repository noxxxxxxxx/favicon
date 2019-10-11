'use strict';
var request = require('request');

module.exports = function does_it_render(url, callback) {
    request(url, function (err, res, body) {
        if (err) return callback(err);
        callback(null, res.statusCode == 200);
    });
}