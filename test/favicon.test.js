'use strict';
const Favicon = require('../index');
const extractLink = require('../lib/helper');

describe('test helper.js work', () => {

    const url = 'https://www.noxxxx.com';
    const value = url + '/favicon.ico';

    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href="/favicon.ico">'
        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });

    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href="favicon.ico">'

        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });

    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href="//www.noxxxx.com/favicon.ico">'
        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });

    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href="https://www.noxxxx.com/favicon.ico">'
        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });

    test('should get favicon link', done => {
        const fakeHtml = '<link rel="icon" href=https://www.noxxxx.com/favicon.ico>'
        const result = extractLink(url, fakeHtml);
        Favicon(url, (err, icon) => {
            expect(result).toBe(value);
            done();
        });
    });

    // test real site which has no favicon.ico file
    test('should get favicon link', done => {
        const value = 'https://cdn.qnmlgb.tech/moyubang.png';
        const url = 'https://bang.duomoyu.com/';
        Favicon(url, (err, icon) => {
            expect(icon).toBe(value);
            done();
        });
    });
    
    
    // test real site which has no favicon file
    test('should get favicon link', done => {
        const value = null;
        const url = 'https://www.printf520.com';
        Favicon(url, (err, icon) => {
            expect(icon).toBe(value);
            done();
        });
    });
});