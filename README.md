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

  mobile: { 
    
    // No :hover styles
    // skip media queries that wont match a screen of 0px:
    // @media(min-width: 300px) {} won't match
    // @media(max-width: 300px) {} will match

    hover: 'exclude',
    screens: [ '0px' ]
  },

  tablet: { // small screens and a little bigger
    hover: 'exclude',
    screens: [ '0px', '700px' ]
  },
  

  hover: {
    // skip rules including :hover styles only,
    // useful if you decide to re-add :hover using a separate file
    hover: 'only',

    // matches all screens
    screens: 'any'
  }

  desktop: {
    // includes any rule, including :hover styles
    // but excludes anything outside media queries
    media: 'only',

    // matches bigger screen media queries only
    screens: [ '1024px' ]
  }

  noMediaQueries: {
    // matches anything but media queries
    media: 'exclude'
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

### A note about safety

Mobilizer retains order of rules as they are declared in input sources so it is generally safe to apply it. 

Just be careful when you try to recombine mobilizer stylesheets together. I.e.

```js
mobilizer(bootstrap_css, {
  'mobile.css': {
    media: 'exclude',
    hover: 'exclude'
  },
  'responsive.css': {
    media: 'only',
    hover: 'exclude'  
  },
  'hover.css': {
    hover: 'only'
  }
});
```

``` html
<!-- Correct -->
<head>
  <link href='hover.css'></link>
  <link href='mobile.css'></link>
  <link href='responsive.css'></link>
</head>
```

``` html
<!-- Wrong -->
<head>
  <link href='hover.css'></link>
  <link href='responsive.css'></link>
  <link href='mobile.css'></link>
</head>
```

### Api

Mobilizer module exports only a function.

```
mobilizer(src, targets);
```

- `src` is a _string_ containing css source.

- `targets` is an _object_ mapping target names with target options. Valid target options are:

| Option    |  Type  | Description |
| --------- | ------ | ----------- |
| `hover`   | string  | `include`/`only`/`exclude`, default = `'include'`         |
| `media`   | string  | `include`/`only`/`exclude`, default = `'include'`          |
| `screens` | array or string  | a list of screen sizes that target stylesheet will match, default = `['any']` |

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
