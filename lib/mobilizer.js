var sqm = require('./sqm'),
    parse = require('./parse')
    hover = require('./hover'),
    reduce = require('./reduce'),
    stringify = require('./stringify');

module.exports = function(source, options) {
  var rules = parse(source),
      acc = sqm(rules);
  
  Object.keys(acc).forEach(function(k){
    acc[k] = hover(acc[k]);
  });

  var res = {};
  var targets = (options && options.targets) || {};
  
  Object.keys(targets).forEach(function(k){
    res[k] = stringify(reduce(acc, targets[k]));
  });
  
  return res;
};