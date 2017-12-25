import * as faker from 'faker'
import { user, User, initialUserState } from './user'
import { SchedulerForTogglAppState } from './'

/**
 * Action creators
 */

import {
  changeApiToken,
  validateApiToken,
  validateApiTokenComplete,
  validateApiTokenError,
} from '../actions/user'

describe('user reducer', () => {
  let state: Partial<SchedulerForTogglAppState>

  beforeEach(() => {
    state = {
      user: initialUserState,
    }
  })

  describe('changeApiToken action', () => {
    it('accepts a new valid user value', () => {
      const newApiToken = faker.random.alphaNumeric(16)

      state.user =
        user(state.user, changeApiToken({apiToken: newApiToken}))
      expect(state.user.apiToken).toEqual(newApiToken)
    })

    it('accepts a blank user value', () => {
      const blankApiToken = ''

      state.user =
        user(state.user, changeApiToken({apiToken: blankApiToken}))
      expect(state.user.apiToken).toEqual(blankApiToken)
    })
  })

  describe('validateApiTokenComplete action', () => {
    const userData = {
      id: 555,
      defaultWorkspaceId: 333,
    } as User

    it('accepts the isApiTokenValid value', () => {
      const isApiTokenValid = true

      state.user =
        user(state.user, validateApiTokenComplete({
          isApiTokenValid: isApiTokenValid,
          user: userData,
        }))
      expect(state.user.isApiTokenValid).toEqual(isApiTokenValid)
    })

    it('clears the isApiTokenValidating state', () => {
      const isApiTokenValid = true
      state = {
        user: Object.assign({ isApiTokenValidating: true }, initialUserState),
      }

      state.user =
        user(state.user, validateApiTokenComplete({
          isApiTokenValid: isApiTokenValid,
          user: userData,
        }))
      expect(state.user.isApiTokenValidating).toEqual(false)
    })
  })

  describe('validateApiTokenError action', () => {
    const errorMessage = faker.lorem.sentence()

    it('accepts the error', () => {
      state.user =
        user(state.user, validateApiTokenError({error: errorMessage}))
      expect(state.user.error).toEqual(errorMessage)
    })

    it('clears the isApiTokenValidating state', () => {
      state = {
        user: Object.assign({ isApiTokenValidating: true }, initialUserState),
      }

      state.user =
        user(state.user, validateApiTokenError({error: errorMessage}))
      expect(state.user.isApiTokenValidating).toEqual(false)
    })

    it('marks the API token as invalid', () => {
      state = {
        user: Object.assign({ isApiTokenValid: true }, initialUserState),
      }

      state.user =
        user(state.user, validateApiTokenError({error: errorMessage}))
      expect(state.user.isApiTokenValid).toEqual(false)
    })
  })

  describe('validateApiToken action', () => {

    it('sets the isApiTokenValidating flag', () => {
      state.user = user(state.user, validateApiToken({}))
      expect(state.user.isApiTokenValidating).toEqual(true)
    })

    it('clears any existing error', () => {
      state = {
        user: Object.assign(
          { error: faker.lorem.sentence() },
          initialUserState,
        ),
      }

      state.user = user(state.user, validateApiToken({}))
      expect(state.user.error).toEqual(null)
    })
  })
})
