module.exports = function(rules) {
  var result = { screen: [] };

  rules.forEach(function(rule){
    if (!rule){ return false }

    if (rule.type === "media") {
      result[rule.media] = (result[rule.media] || []).concat(rule.rules || []);
    } else {
      result.screen.push(rule);
    }
  });


  return result;
};