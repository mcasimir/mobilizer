var should = require('should'),
    fs = require('fs'),
    path = require('path');

var sqm = require('../lib/sqm'),
    parse = require('../lib/parse');

var src = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.css'), {encoding: 'utf8'});


it('should split media queries', function(){
  sqm(parse(src));
});