import * as faker from 'faker'
import { apiToken, initialApiTokenState } from './apiToken'
import { SchedulerForTogglAppState } from './'

/**
 * Action creators
 */

import {
  changeApiToken,
  validateApiToken,
  validateApiTokenComplete,
  validateApiTokenError,
} from '../actions/apiToken'

describe('apiToken reducer', () => {
  let state: Partial<SchedulerForTogglAppState>

  beforeEach(() => {
    state = {
      apiToken: initialApiTokenState,
    }
  })

  describe('changeApiToken action', () => {
    it('accepts a new valid apiToken value', () => {
      const newApiToken = faker.random.alphaNumeric()

      state.apiToken =
        apiToken(state.apiToken, changeApiToken({apiToken: newApiToken}))
      expect(state.apiToken.apiToken).toEqual(newApiToken)
    })

    it('accepts a blank apiToken value', () => {
      const blankApiToken = ''

      state.apiToken =
        apiToken(state.apiToken, changeApiToken({apiToken: blankApiToken}))
      expect(state.apiToken.apiToken).toEqual(blankApiToken)
    })
  })

  describe('validateApiTokenComplete action', () => {
    it('accepts the isValid value', () => {
      const isValid = true

      state.apiToken =
        apiToken(state.apiToken, validateApiTokenComplete({isValid: isValid}))
      expect(state.apiToken.isValid).toEqual(isValid)
    })

    it('clears the isValidating state', () => {
      const isValid = true
      state = {
        apiToken: Object.assign({ isValidating: true }, initialApiTokenState),
      }

      state.apiToken =
        apiToken(state.apiToken, validateApiTokenComplete({isValid: isValid}))
      expect(state.apiToken.isValidating).toEqual(false)
    })
  })

  describe('validateApiTokenError action', () => {
    const errorMessage = faker.lorem.sentence()

    it('accepts the error', () => {
      state.apiToken =
        apiToken(state.apiToken, validateApiTokenError({error: errorMessage}))
      expect(state.apiToken.error).toEqual(errorMessage)
    })

    it('clears the isValidating state', () => {
      state = {
        apiToken: Object.assign({ isValidating: true }, initialApiTokenState),
      }

      state.apiToken =
        apiToken(state.apiToken, validateApiTokenError({error: errorMessage}))
      expect(state.apiToken.isValidating).toEqual(false)
    })

    it('marks the API token as invalid', () => {
      state = {
        apiToken: Object.assign({ isValid: true }, initialApiTokenState),
      }

      state.apiToken =
        apiToken(state.apiToken, validateApiTokenError({error: errorMessage}))
      expect(state.apiToken.isValid).toEqual(false)
    })
  })

  describe('validateApiToken action', () => {

    it('sets the isValidating flag', () => {
      state.apiToken = apiToken(state.apiToken, validateApiToken({}))
      expect(state.apiToken.isValidating).toEqual(true)
    })

    it('clears any existing error', () => {
      state = {
        apiToken: Object.assign(
          { error: faker.lorem.sentence() },
          initialApiTokenState,
        ),
      }

      state.apiToken = apiToken(state.apiToken, validateApiToken({}))
      expect(state.apiToken.error).toEqual(null)
    })
  })
})
