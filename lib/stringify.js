var cssStringify = require('css-stringify');

module.exports = function(rules) {
  var stylesheet = {
    type: "stylesheet",
    stylesheet: {
      rules: rules
    }
  };

  return cssStringify(stylesheet);
};

