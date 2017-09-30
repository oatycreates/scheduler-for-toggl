import { isType } from '../actions/actionCreator'
import { Action as ReduxAction } from 'redux'
import * as TogglClient from 'toggl-api'

/**
 * Action creators
 */

import {
  fetchWorkspaceProjectsStarted,
  fetchWorkspaceProjectsComplete,
  fetchWorkspaceProjectsError,
} from '../actions/projects'

/**
 * Represents a project that the user may group time entries into.
 */
export interface Project extends TogglClient.Project {
}

/**
 * Partial state type signature
 */
export interface ProjectsState {
  workspaceId: number | null,
  projects: Array<Project>,
  isFetching: boolean,
  error?: string,
}

/**
 * Initial state of this reducer.
 */
export const initialProjectsState = {
  workspaceId: null,
  projects: Array<Project>(),
  error: undefined,
} as ProjectsState

/**
 * Returns the partial state that has been altered by the input action.
 * @param projects Existing partial state chunk for this reducer.
 * @param action Action to be handled by this reducer.
 */
export function projects(
    projectsState: ProjectsState = initialProjectsState,
    action: ReduxAction): ProjectsState {
  if (isType(action, fetchWorkspaceProjectsStarted)) {
    // Mark the workspace ID projects as fetching
    return Object.assign({}, projectsState, {
      workspaceId: action.payload.workspaceId,
      isFetching: true,
    })
  } else if (isType(action, fetchWorkspaceProjectsComplete)) {
    // Store the new projects
    return Object.assign({}, projectsState, {
      workspaceId: action.payload.workspaceId,
      projects: action.payload.projects,
      isFetching: false,
    })
  } else if (isType(action, fetchWorkspaceProjectsError)) {
    // Store the provided error
    return Object.assign({}, projectsState, {
      workspaceId: action.payload.workspaceId,
      isFetching: false,
      error: action.payload.error,
    })
  } else {
    return projectsState
  }
}
