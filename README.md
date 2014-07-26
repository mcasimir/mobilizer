# Mobilizer

## Extract mobile stylesheet from responsive css files

### Description

`mobilizer` is a node.js module that allows you to strip :hover styles and media-queries from a responsive css, creating smaller stylesheets that are better suitable for touch devices and small screens.

### Install

``` 
npm install mobilizer --save-dev
```

### Usage

``` js
var mobilizer = require("mobilizer");

mobilizer(src, {
  targets: {   
    mobile: { 
      
      // No :hover styles
      // skip media queries that wont match a screen of 0px:
      // @media(min-width: 300px) {} won't match
      // @media(max-width: 300px) {} will match

      hover: false,
      screens: [ '0px' ]
    },

    tablet: { // small screens and a little bigger
      hover: false,
      screens: [ '0px', '700px' ]
    },
    

    hover: {
      // skip rules including :hover styles only,
      // useful if you decide to re-add :hover using a separate file
      rules: false,

      // matches all screens
      screens: 'any'
    }

    desktop: {
      // includes any rule, including :hover styles

      // matches bigger screens only
      screens: [ '1024px' ]
    }
  }
});
```

This would return an object like this:

``` js
{
  mobile: '...stylesheet content...',
  tablet: '...stylesheet content...',
  hover: '...stylesheet content...',
  desktop: '...stylesheet content...'
}
```

### Api

Mobilizer exports only a function.

```
mobilizer(src, options);
```

valid options are:

| `targets` | An object mapping targetName:targetOptions |

where valid targetOptions are:

| `hover` | boolean | wether to include :hover styles or not |
| `rules` | boolean | wether to include plain rules or not |
| `screens` | array | a list of screen sizes that target stylesheet will match |

---

Copyright (c) 2014 mcasimir (https://github.com/mcasimir)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
