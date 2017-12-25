import { actionCreator } from './actionCreator'
import { Dispatch } from 'redux'
import * as TogglClient from 'toggl-api'
import { Project } from '../reducers/projects'
import { getTogglClient, formatTogglApiErrorMessage } from '../apiClients/TogglClient'

/**
 * Action types
 */

const FETCH_WORKSPACE_PROJECTS_STARTED = 'FETCH_WORKSPACE_PROJECTS_STARTED'
const FETCH_WORKSPACE_PROJECTS_COMPLETE = 'FETCH_WORKSPACE_PROJECTS_COMPLETE'
const FETCH_WORKSPACE_PROJECTS_ERROR = 'FETCH_WORKSPACE_PROJECTS_ERROR'

/**
 * Action creators
 */

export const fetchWorkspaceProjectsStarted = actionCreator<{
    workspaceId: number,
}>(FETCH_WORKSPACE_PROJECTS_STARTED)
export const fetchWorkspaceProjectsComplete = actionCreator<{
    workspaceId: number,
    projects: Array<Project>,
}>(FETCH_WORKSPACE_PROJECTS_COMPLETE)
export const fetchWorkspaceProjectsError = actionCreator<{
  workspaceId?: number,
  error: string,
}>(FETCH_WORKSPACE_PROJECTS_ERROR)

/**
 * Thunks
 */

export function fetchWorkspaceProjects(workspaceId: number) {
  return function (dispatch: Dispatch<{}>) {
    // Let the state tree know the request has begun
    dispatch(fetchWorkspaceProjectsStarted({ workspaceId }))

    // Submit the time entry
    const togglClient = getTogglClient()
    togglClient.getWorkspaceProjects(
        workspaceId,
        {},
        (err: TogglClient.APIError, projects: Array<TogglClient.Project>) => {
      if (err) {
        // An API error was raised
        dispatch(fetchWorkspaceProjectsError({
          workspaceId,
          error: formatTogglApiErrorMessage(err),
        }))
      } else {
        // The API request completed successfully
        dispatch(fetchWorkspaceProjectsComplete({
          workspaceId,
          projects,
        }))
      }
    })
  }
}
