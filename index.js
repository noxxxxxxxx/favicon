var Url = require('url');
var request = require('request');

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
            var link_re = /<link (.*)>/gi;
            var rel_re = /rel=["'][^"]*icon[^"']*["']/i;
            var href_re = /href=["']([^"']*)["']/i;
            var direct_file = /\w*\.+(png|ico|gif|jpg)?/i;
            var match = null;
            var ico_match = null;

            while (match = link_re.exec(body)) {
                if (rel_re.test(match[1]) && (ico_match = href_re.exec(match[1]))) {
                    ico = ico_match[1];
                    // some website use the link without protocol
                    if (ico.indexOf('//') === 0) {
                        ico = p.protocol + ico;
                    // use the relative path
                    } else if (ico[0] === "/") {
                        ico = root + ico;
                    // only have the file name e.g 'test.png'
                    } else if (direct_file.test(ico)) {
                        ico = root + '/' + ico;
                    }
                    return callback(null, ico);
                }
            }

            // No favicon could be found.
            return callback(null, null);
        });
    });
};


// Internal: Check the status code.
function does_it_render(url, callback) {
    request(url, function (err, res, body) {
        if (err) return callback(err);
        callback(null, res.statusCode == 200);
    });
}