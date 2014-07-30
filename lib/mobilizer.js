var parse = require('./parse'),
    Target = require('./target'),
    stringify = require('./stringify');

module.exports = function(source, targets) {
  var rules = parse(source);
  var res = {};
  var targets = targets || {};
  
  Object.keys(targets).forEach(function(k){
    var target = new Target(targets[k]);
    res[k] = stringify(target.process(rules));
  });
  
  return res;
};