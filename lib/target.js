var mediaQuery = require('css-mediaquery'),
    clone = require('clone');

function Target(target) {
  this.includeHoverSelectors      = (target.hover !== 'exclude');
  this.includeNonHoverSelectors   = (target.hover !== 'only');
  this.includeMediaRules          = (target.media !== 'exclude');
  this.includeRegularRules        = (target.media !== 'only');
  this.screens = [].concat(target.screens || ['any']);
}

Target.prototype.process = function(rules) {
  return this.processHoverSelectors(this.procesMediaQueries(rules));
};

Target.prototype.mediaMatch = function(query) {
  var res = false;
  return !! this.screens.filter(function(width){
    return (width == 'any') || mediaQuery.match(query, {
      type : 'screen',
      width: width
    });
  }).length;
};

Target.prototype.processHoverSelectors = function(rules) {
  if (this.includeHoverSelectors && this.includeNonHoverSelectors) {
    return rules;
  } else {
    var rules  = clone(rules);
    var target = this;
    
    rules.forEach(function(rule){
      if (rule.type === 'media') {
        rule.rules = target.processHoverSelectors(rule.rules);
      } else if (rule.type === 'rule') {
        rule.selectors = rule.selectors.filter(function(selector){
          var isHover = selector.match(/\:hover/);
          return (isHover && target.includeHoverSelectors) || ((!isHover) && target.includeNonHoverSelectors);
        });
      }
    });
    return rules.filter(function(rule){
      return rule.type === 'rule' ? 
        rule.selectors.length : (
          target.includeHoverSelectors ? // here this means include only 
                                         // hover selectors cause we tested it
                                         // previously
            rule.type === 'media' :
            true
          );
    });
  }
};

Target.prototype.procesMediaQueries = function(rules) {
  var target = this;
  return rules.filter(function(rule){
    return (target.includeRegularRules && rule.type != 'media')
            || (rule.type == 'media' && target.includeMediaRules && target.mediaMatch(rule.media));
  });
};

module.exports = Target;