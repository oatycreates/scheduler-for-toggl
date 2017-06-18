// Mock Toggl imports to prevent actual API access
jest.mock('../apiClients/TogglClient')

import * as faker from 'faker'
import configureStore, { IStore } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SchedulerForTogglAppState } from '../reducers/'

import {
  changeApiToken,
  validateApiToken,
  validateApiTokenComplete,
  validateApiTokenError,
  submitApiToken,
} from './apiToken'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore<Partial<SchedulerForTogglAppState>>(middlewares)

describe('apiToken actions', () => {
  let store: IStore<Partial<SchedulerForTogglAppState>>
  beforeEach(() => {
    // NOTE: 2017/06/10 - It seems that if an initial state object is imported
    // from another file, then the jest mock for TogglClient will be cleared.
    // The cause of this is unclear, may have something to do with the
    // transpilation steps to go from TypeScript ES6 to ES5? Use a plain state
    // initialiser for now.

    // Mock the store with the intial state
    store = mockStore({
      apiToken: {
        apiToken: '',
        error: '',
        isValid: false,
        isValidating: false,
      },
    })
  })

  // See: http://redux.js.org/docs/recipes/WritingTests.html
  describe('submitApiToken action', () => {
    describe('with valid API token', () => {
      const validApiToken = faker.random.alphaNumeric(16)

      it('dispatches the validateApiTokenComplete action', () => {
        const expectedActions = [
          validateApiToken({}),
          validateApiTokenComplete({ isValid: true }),
        ]

        store.dispatch(submitApiToken(validApiToken))
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('with invalid API token', () => {
      const invalidApiToken = ''

      it('dispatches the validateApiTokenError action', () => {
        const expectedActions = [
          validateApiToken({}),
          validateApiTokenError({ error: '400: Invalid API key' }),
        ]

        store.dispatch(submitApiToken(invalidApiToken))
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('changeApiToken action', () => {
    it('correctly performs the changeApiToken action', () => {
      const newApiToken = faker.random.alphaNumeric(16)
      const expectedActions = [
        changeApiToken({apiToken: newApiToken}),
      ]

      store.dispatch(changeApiToken({apiToken: newApiToken}))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
