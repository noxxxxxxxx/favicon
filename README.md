# Favicon

[![Build Status](https://travis-ci.org/noxxxxxxxx/favicon.svg?branch=dev)](https://travis-ci.org/noxxxxxxxx/favicon)
[![codecov](https://codecov.io/gh/noxxxxxxxx/favicon/branch/dev/graph/badge.svg)](https://codecov.io/gh/noxxxxxxxx/favicon)

## Example

### Install

```bash
yarn add favicon-exist
# or
npm install favicon-exist
```

### Use

```js
var favicon = require('favicon-exist');
var url = 'https://www.noxxxx.com';
var result = null;

favicon(url, function (error, icon) {
    if (error) return;
    result = icon;
});
```

## Why

The original npm package 'favicon' seems like not maintaining, and I fix several bugs to improve the ability to get favicon url.

## Development

Skip this part if you just want to use favicon.

For those who are interested in contributing to this plugin, you can submit pull request or just download this repository and run.

## License

Favicon is released under the [GNU License](http://www.gnu.org/licenses/lgpl-3.0.en.html)