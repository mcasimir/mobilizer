var cssParse = require('css-parse');

module.exports = function(source) {
  var rules = cssParse(source).stylesheet.rules;
  if ((!rules) || (!rules.length)) {
    rules = [];
  };

  return rules;
};