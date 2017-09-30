import { combineReducers } from 'redux'

/**
 * Reducer imports
 */

import { apiToken, ApiTokenState, initialApiTokenState } from './apiToken'
import { scheduleEntries, ScheduleEntriesState, initialScheduleEntriesState } from './scheduleEntries'
import { projects, ProjectsState, initialProjectsState } from './projects'

/**
 * State tree typing
 */

// This represents the state tree generated from all of the imported reducers
export interface SchedulerForTogglAppState {
  apiToken: ApiTokenState,
  scheduleEntries: ScheduleEntriesState,
  projects: ProjectsState,
}

/**
 * Initial application state tree
 */

export const initialSchedulerForTogglAppState: SchedulerForTogglAppState = {
  apiToken: initialApiTokenState,
  scheduleEntries: initialScheduleEntriesState,
  projects: initialProjectsState,
}

// This aggregates all included reducer modules into a single reducer for the store
const schedulerForTogglApp = combineReducers<SchedulerForTogglAppState>({
  apiToken,
  scheduleEntries,
  projects,
})

export default schedulerForTogglApp
