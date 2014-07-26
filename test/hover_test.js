var should = require('should'),
    fs = require('fs'),
    path = require('path');

var sqm = require('../lib/sqm'),
    hover = require('../lib/hover'),
    parse = require('../lib/parse');

var src = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.css'), {encoding: 'utf8'});

var mq = sqm(parse(src));
var screen = mq.screen;

it('should split hover styles', function(){
  hover(screen);  
});

