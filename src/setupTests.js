/**
 * This file will be resolved by Create React App to initialise the testing environment.
 */

import 'jest-enzyme'

// Bind jQuery
global.jQuery = global.$ = require('jquery')

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
