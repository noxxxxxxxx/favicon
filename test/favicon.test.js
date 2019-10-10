'use strict';
const Favicon = require('../index');
const extractLink = require('../helper');

// describe('test asynchronous function can run', () => {
//     test('should get expected favicon link', done => {
//         const url = 'https://www.baidu.com';
//         Favicon(url, (err, icon) => {
//             const result = 'https://www.baidu.com/favicon.ico';
//             expect(icon).toBe(result);
//             done();
//         });
//     })
// });


describe('test helper.js work', () => {
    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href="/a.icon"></link>'
        const url = 'https://www.noxxxx.com';
        const value = url + '/a.icon';
        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });
});