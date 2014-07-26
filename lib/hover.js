var clone = require('clone');

module.exports = function(rules) {
  var result = { base: [], hover: [], original: clone(rules) };

  rules.forEach(function(rule){
    if (rule.type === 'rule') {
      var hoverSelectors = [];

      rule.selectors = rule.selectors.filter(function(selector){
        var isHoverSelector = selector.match(/\:hover/);
        if (isHoverSelector) {
          hoverSelectors.push(selector);
          return false;
        } else {
          return true;
        }
      });

      if (hoverSelectors.length) {
        // create a rule with these selectors
        result.hover.push({
          type: 'rule',
          selectors: hoverSelectors,
          declarations: rule.declarations
        });
      }
    }
  });

  // deletes roules that only had :hover selectors thus having empty selectors now
  result.base = rules.filter(function(rule){
    return rule.type != 'rule' || (!! rule.selectors.length);
  });

  return result;
};