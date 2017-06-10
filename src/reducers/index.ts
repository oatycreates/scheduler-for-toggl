import { combineReducers } from 'redux'

/**
 * Reducer imports
 */

import { apiToken, ApiTokenState, initialApiTokenState } from './apiToken'
import { scheduleEntries, ScheduleEntriesState, initialScheduleEntriesState } from './scheduleEntries'

/**
 * State tree typing
 */

// This represents the state tree generated from all of the imported reducers
export interface SchedulerForTogglAppState {
  apiToken: ApiTokenState,
  scheduleEntries: ScheduleEntriesState,
}

/**
 * Initial application state tree
 */

export const initialSchedulerForTogglAppState = {
  apiToken: initialApiTokenState,
  scheduleEntries: initialScheduleEntriesState,
} as SchedulerForTogglAppState

// This aggregates all included reducer modules into a single reducer for the store
const schedulerForTogglApp = combineReducers<SchedulerForTogglAppState>({
  apiToken,
  scheduleEntries,
})

export default schedulerForTogglApp
