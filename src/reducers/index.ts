import { combineReducers } from 'redux'

/**
 * Reducer imports
 */

import { apiToken, ApiTokenState } from './apiToken'

/**
 * State tree typing
 */

// This represents the state tree generated from all of the imported reducers
export interface SchedulerForTogglAppState {
  apiToken: ApiTokenState,
}

// This aggregates all included reducer modules into a single reducer for the store
const schedulerForTogglApp = combineReducers({
  apiToken,
})

export default schedulerForTogglApp
