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
} from '../actions/apiToken'

/**
 * Partial state type signature
 */
export interface ApiTokenState {
  apiToken: string,
  isValid: boolean,
  isValidating: boolean,
  error: string,
}

/**
 * Initial state of this reducer.
 */
export const initialApiTokenState = Object.freeze({
  apiToken: '',
  error: '',
  isValid: false,
  isValidating: false,
})

/**
 * Returns the partial state that has been altered by the input action.
 * @param apiTokenState Existing partial state chunk for this reducer.
 * @param action Action to be handled by this reducer.
 */
export function apiToken(
    apiTokenState: ApiTokenState = initialApiTokenState,
    action: ReduxAction): ApiTokenState {
  if (isType(action, changeApiToken)) {
    return Object.assign({}, apiTokenState, {
      apiToken: action.payload.apiToken,
    })
  } else if (isType(action, validateApiTokenComplete)) {
    return Object.assign({}, apiTokenState, {
      isValid: action.payload.isValid,
      isValidating: false,
    })
  } else if (isType(action, validateApiTokenError)) {
    return Object.assign({}, apiTokenState, {
      isValid: false,
      isValidating: false,
      // Holds any API errors that occur
      error: action.payload.error,
    })
  } else if (isType(action, validateApiToken)) {
    return Object.assign({}, apiTokenState, {
      isValidating: true,
      error: null,
    })
  } else {
    return apiTokenState
  }
}
