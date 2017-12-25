import { combineReducers } from 'redux'

/**
 * Reducer imports
 */

import { user, UserState, initialUserState } from './user'
import { scheduleEntries, ScheduleEntriesState, initialScheduleEntriesState } from './scheduleEntries'
import { projects, ProjectsState, initialProjectsState } from './projects'

/**
 * State tree typing
 */

// This represents the state tree generated from all of the imported reducers
export interface SchedulerForTogglAppState {
  user: UserState,
  scheduleEntries: ScheduleEntriesState,
  projects: ProjectsState,
}

/**
 * Initial application state tree
 */

export const initialSchedulerForTogglAppState: SchedulerForTogglAppState = {
  user: initialUserState,
  scheduleEntries: initialScheduleEntriesState,
  projects: initialProjectsState,
}

// This aggregates all included reducer modules into a single reducer for the store
const schedulerForTogglApp = combineReducers<SchedulerForTogglAppState>({
  user,
  scheduleEntries,
  projects,
})

export default schedulerForTogglApp
