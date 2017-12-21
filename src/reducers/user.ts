import { isType } from '../actions/actionCreator'
import { Action as ReduxAction } from 'redux'

/**
 * Action creators
 */

import {
  changeApiToken,
  validateApiToken,
  validateApiTokenComplete,
  validateApiTokenError,
} from '../actions/user'

/**
 * Represents the user data retrieved from Toggl, see TogglClient.User.
 */
export interface User {
  id: number,
  defaultWorkspaceId: number,
}

/**
 * Partial state type signature
 */
export interface UserState {
  apiToken: string,
  isApiTokenValid: boolean,
  isApiTokenValidating: boolean,
  user: User | null,
  error: string,
}

/**
 * Initial state of this reducer.
 */
export const initialUserState = Object.freeze({
  apiToken: '',
  error: '',
  user: null,
  isApiTokenValid: false,
  isApiTokenValidating: false,
})

/**
 * Returns the partial state that has been altered by the input action.
 * @param userState Existing partial state chunk for this reducer.
 * @param action Action to be handled by this reducer.
 */
export function user(
    userState: UserState = initialUserState,
    action: ReduxAction): UserState {
  if (isType(action, changeApiToken)) {
    return Object.assign({}, userState, {
      user: null,
      apiToken: action.payload.apiToken,
    })
  } else if (isType(action, validateApiTokenComplete)) {
    return Object.assign({}, userState, {
      user: action.payload.user,
      isApiTokenValid: action.payload.isApiTokenValid,
      isApiTokenValidating: false,
    })
  } else if (isType(action, validateApiTokenError)) {
    return Object.assign({}, userState, {
      isApiTokenValid: false,
      isApiTokenValidating: false,
      // Holds any API errors that occur
      error: action.payload.error,
    })
  } else if (isType(action, validateApiToken)) {
    return Object.assign({}, userState, {
      isApiTokenValidating: true,
      error: null,
    })
  } else {
    return userState
  }
}
