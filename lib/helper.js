'use strict';

var Url = require('url');

module.exports = function extractLint(url, html) {
    var p = Url.parse(url);
    var root = p.protocol + "//" + p.host;
    var ico = root + "/favicon.ico";

    var link_re = /<link (.*)>/gi;
    var rel_re = /rel=["'][^"]*icon[^"']*["']/i;
    var href_re = /href=["']([^"']*)["']/i;
    var direct_file = /\w*\.+(png|ico|gif|jpg|svg)?/i;
    var match = null;
    var ico_match = null;

    while (match = link_re.exec(html)) {
        ico_match = href_re.exec(match[1]);
        var href_match = rel_re.test(match[1]) && ico_match;
        // some website link tag href without quote
        if (!href_match && rel_re.test(match[1])) {
            href_match = match[1].split('href=');
        }
        if(!href_match) return null;
        var ico = href_match[1];
        // some website use the full link, no need to change
        if (ico.indexOf('http') === 0) {
            // some website use the link without protocol
        } else if (ico.indexOf('//') === 0) {
            ico = p.protocol + ico;
            // use the relative path
        } else if (ico[0] === "/") {
            ico = root + ico;
            // only have the file name e.g 'test.png'
        } else if (direct_file.test(ico)) {
            ico = root + '/' + ico;
        }
        return ico;
    }
}