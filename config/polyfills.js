'use strict';

// Ensure the Map and Set collection types and requestAnimationFrame are available as required
// by React v16: https://reactjs.org/docs/javascript-environment-requirements.html
require("babel-polyfill");
const raf = require('raf');
raf.polyfill();

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  global.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
