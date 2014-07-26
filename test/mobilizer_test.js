var should = require('should'),
    fs = require('fs'),
    path = require('path');

var mobilizer = require('../lib/mobilizer');

var src = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.css'), {encoding: 'utf8'});

res = mobilizer(src, {
  targets: {   
    mobile: {
      hover: false,
      screens: [ '0px' ]
    },

    tablet: {
      hover: false,
      screens: [ '301px' ]
    },

    desktop: {
      screens: [ '301px' ]
    }
  }
});

console.log(res);