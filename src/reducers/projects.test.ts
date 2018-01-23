import * as faker from 'faker'
import * as moment from 'moment'
import { generateRandomProject } from '../lib/testHelpers/project'
import { projects, Project } from './projects'
import { SchedulerForTogglAppState } from './'

/**
 * Action creators
 */

import {
  fetchWorkspaceProjectsStarted,
  fetchWorkspaceProjectsComplete,
  fetchWorkspaceProjectsError,
} from '../actions/projects'

describe('projects reducer', () => {
  let state: Partial<SchedulerForTogglAppState>
  // Only one workspace ID is supported for now
  const workspaceId = faker.random.number()

  beforeEach(() => {
    state = {
      projects: {
        workspaceId: null,
        projects: Array<Project>(),
        isFetching: false,
        error: null,
      },
    }
  })

  describe('fetch workspace projects actions', () => {
    describe('fetchWorkspaceProjectsStarted action', () => {
      it('sets the fetching flag in the state', () => {
        state.projects = projects(
          state.projects,
          fetchWorkspaceProjectsStarted({
            workspaceId: workspaceId,
          }),
        )

        expect(state.projects.isFetching).toEqual(true)
      })
    })

    describe('fetchWorkspaceProjectsComplete action', () => {
      let fetchProjects: Array<Project>
      beforeEach(() => {
        fetchProjects = [
          generateRandomProject(null, workspaceId),
          generateRandomProject(null, workspaceId),
        ]
      })

      it('stores the new projects', () => {
        state.projects = projects(
          state.projects,
          fetchWorkspaceProjectsComplete({
            workspaceId: workspaceId,
            projects: fetchProjects,
          }),
        )

        expect(state.projects.workspaceId).toEqual(workspaceId)
        expect(state.projects.projects.length).toEqual(projects.length)
        expect(state.projects.isFetching).toEqual(false)
      })
    })

    describe('fetchWorkspaceProjectsError action', () => {
      const error = faker.lorem.sentence()

      it('sets the projects submit error message', () => {
        state.projects = projects(
          state.projects,
          fetchWorkspaceProjectsError({
            error: error,
          }),
        )

        expect(state.projects.error).toEqual(error)
      })
    })
  })
})
