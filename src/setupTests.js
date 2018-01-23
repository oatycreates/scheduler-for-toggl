/**
 * This file will be resolved by Create React App to initialise the testing environment.
 */

// Ensure the Map and Set collection types are available as required
// by React v16: https://reactjs.org/docs/javascript-environment-requirements.html
import "babel-polyfill";

import 'jest-enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Bind the React v16 enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Bind jQuery
global.jQuery = global.$ = require('jquery')

// Bind popper.js
global.Popper = require('popper.js/dist/umd/popper')

/**
 * Mock global.localStorage with a simplistic implementation.
 * See: https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
 */
class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()
