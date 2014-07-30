var should = require('should'),
    fs = require('fs'),
    path = require('path'),
    mobilizer = require('..'),
    src = fs.readFileSync(path.resolve(__dirname, 'fixtures/test.css'), {encoding: 'utf8'});

// a { color: #000; }
// a:hover { color: #001; }
// @media (min-width: 300px) {
//   a { color: #002; }
//   a:hover { color: #003; }
// }

describe('mobilizer', function(){
  it('Should work', function(){
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

    res.mobile.should.equal(
      [
      'a {',
      '  color: #000;',
      '}'
      ].join('\n')
    );
    
    res.tablet.should.equal(
      [
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
