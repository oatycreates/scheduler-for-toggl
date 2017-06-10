import * as faker from 'faker'
import configureStore, { IStore } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SchedulerForTogglAppState, initialSchedulerForTogglAppState } from '../reducers/'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore<SchedulerForTogglAppState>(middlewares)

// Mock Toggl imports to prevent actual API access
jest.mock('../apiClients/TogglClient')

import {
  changeApiToken,
  validateApiToken,
  validateApiTokenComplete,
  validateApiTokenError,
  submitApiToken,
} from './apiToken'

describe('apiToken actions', () => {
  let store: IStore<SchedulerForTogglAppState>
  beforeEach(() => {
    // Mock the store with the intial state
    store = mockStore(initialSchedulerForTogglAppState)
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
