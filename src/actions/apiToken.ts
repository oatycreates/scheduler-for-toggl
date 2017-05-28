import { actionCreator } from './actionCreator'
import { Dispatch } from 'redux'
import * as TogglClient from 'toggl-api'
import { initTogglClient, getTogglClient } from '../apiClients/TogglClient'

/**
 * Action types
 */

const CHANGE_API_KEY = 'CHANGE_API_KEY'
const VALIDATE_API_KEY = 'VALIDATE_API_KEY'
const VALIDATE_API_KEY_COMPLETE = 'VALIDATE_API_KEY_COMPLETE'
const VALIDATE_API_KEY_ERROR = 'VALIDATE_API_KEY_ERROR'

/**
 * Action creators
 */

export const changeApiToken = actionCreator<{apiToken: string}>(CHANGE_API_KEY)
export const validateApiToken = actionCreator<{}>(VALIDATE_API_KEY)
export const validateApiTokenComplete = actionCreator<{isValid: boolean}>(VALIDATE_API_KEY_COMPLETE)
export const validateApiTokenError = actionCreator<{error: string}>(VALIDATE_API_KEY_ERROR)

/**
 * Thunks
 */

export function submitApiToken(apiToken: string = '') {
  return function (dispatch: Dispatch<{}>) {
    // Let the state tree know the request has begun
    dispatch(validateApiToken({}))

    // Attempt to intialise the TogglClient
    initTogglClient({
      apiToken,
    })

    // Verify that the API token worked by attempting to fetch the user data
    const togglClient = getTogglClient()
    togglClient.getUserData({}, (err: TogglClient.APIError, userData: TogglClient.UserDataResponse) => {
      if (err) {
        const errors = err.errors ? err.errors : []

        // An API error was raised
        dispatch(validateApiTokenError({
          error: `${err.code}: ${errors.join(', ')}`,
        }))
      } else {
        // The API request completed successfully, the API token is valid
        dispatch(validateApiTokenComplete({ isValid: true }))
      }
    })
  }
}
