var parse = require('./parse'),
    Target = require('./target'),
    stringify = require('./stringify');

module.exports = function(source, options) {
  var rules = parse(source);
  var res = {};
  var targets = (options && options.targets) || {};
  
  Object.keys(targets).forEach(function(k){
    var target = new Target(targets[k]);
    res[k] = stringify(target.process(rules));
  });
  
  return res;
};