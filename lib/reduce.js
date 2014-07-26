var mediaQuery = require('css-mediaquery');

function createMediaRule(selector, rules) {
  return {
    type: 'media',
    media: selector,
    rules: rules
  };
}

module.exports = function(medias, target) {

  var includeHover = (target.hover !== false),
      includeRules = (target.rules !== false),
      screens = target.screens || ['0px'];

  var res = [];
  
  screens.forEach(function(width) {

    Object.keys(medias).forEach(function(k) {
      
      var isMatch = mediaQuery.match(k, {
          type : 'screen',
          width: width
      });

      if (isMatch) {
        var media = medias[k];

        if (k.match(/^\s*\(?\s*screen\s*\)?\s*$/)) {
          if (includeRules && includeHover) {
            res = res.concat(media.original);

          } else if (includeRules) {
            res = res.concat(media.base);

          } else if (includeHover) {
            res = res.concat(media.hover);

          }
        } else {
          if (includeRules && includeHover) {
            res.push(createMediaRule(k, media.original));

          } else if (includeRules) {
            res.push(createMediaRule(k, media.base));

          } else if (includeHover) {
            res.push(createMediaRule(k, media.hover));

          }
        }
      }
    });
  });

  return res;
};