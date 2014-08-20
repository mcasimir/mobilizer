var should = require('should'),
    fs = require('fs'),
    path = require('path'),
    mobilizer = require('..');

var src = [
  '@font-face {\n\n}\n',
  'a {',
  '  color: #000;',
  '}',
  '',
  'a:hover {',
  '  color: #001;',
  '}',
  '',
  '@media (min-width: 300px) {',
  '  a {',
  '    color: #002;',
  '  }',
  '  a:hover {',
  '    color: #003;',
  '  }',
  '}'
].join('\n');

describe('mobilizer', function(){
  res = mobilizer(src, {

      mobile: {
        hover: 'exclude',
        screens: [ '0px' ]
      },

      tablet: {
        hover: 'exclude',
        screens: [ '301px' ]
      },

      responsive: {
        media: 'only',
        screens: [ '301px' ]
      },

      hover: {
        hover: 'only',
        screens: 'any'
      }
    
  });

  it('Should exclude hover', function(){
    res.mobile.should.equal(
      [
      '@font-face {\n\n}\n',
      'a {',
      '  color: #000;',
      '}'
      ].join('\n')
    );
  });

  it('Should exclude hover matching media queries', function(){
    res.tablet.should.equal(
      [ 
        '@font-face {\n\n}\n',
        'a {',
        '  color: #000;',
        '}',
        '',
        '@media (min-width: 300px) {',
        '  a {',
        '    color: #002;',
        '  }',
        '}'
      ].join('\n')
    );
  });
  
  it('Should exclude style outside media queries with media:"only"', function(){
    res.responsive.should.equal(
      [
        '@media (min-width: 300px) {',
        '  a {',
        '    color: #002;',
        '  }',
        '',
        '  a:hover {',
        '    color: #003;',
        '  }',
        '}'
      ].join('\n')
    );
  });

  it('Should exclude anything about hover with hover:"only"', function(){
    res.hover.should.equal(
      [
        'a:hover {',
        '  color: #001;',
        '}',
        '',
        '@media (min-width: 300px) {',
        '  a:hover {',
        '    color: #003;',
        '  }',
        '}'
      ].join('\n')
    );
  });

});