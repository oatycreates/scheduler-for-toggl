import { combineReducers } from 'redux'

/**
 * Reducer imports
 */

import { apiToken, ApiTokenState, initialApiTokenState } from './apiToken'

/**
 * State tree typing
 */

// This represents the state tree generated from all of the imported reducers
export interface SchedulerForTogglAppState {
  apiToken: ApiTokenState,
}

/**
 * Initial application state tree
 */

export const initialSchedulerForTogglAppState = {
  apiToken: initialApiTokenState,
} as SchedulerForTogglAppState

// This aggregates all included reducer modules into a single reducer for the store
const schedulerForTogglApp = combineReducers<SchedulerForTogglAppState>({
  apiToken,
})

export default schedulerForTogglApp
