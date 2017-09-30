// Mock Toggl imports to prevent actual API access
jest.mock('../apiClients/TogglClient')

import * as faker from 'faker'
import * as _ from 'lodash'
import thunk from 'redux-thunk'
import configureStore, { IStore } from 'redux-mock-store'
import { SchedulerForTogglAppState } from '../reducers/'
import { generateRandomProject } from '../lib/testHelpers/project'
import { Project } from '../reducers/projects'
import { initTogglClient } from '../apiClients/TogglClient'

import {
  fetchWorkspaceProjectsStarted,
  fetchWorkspaceProjectsComplete,
  fetchWorkspaceProjectsError,
  fetchWorkspaceProjects,
} from './projects'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore<Partial<SchedulerForTogglAppState>>(middlewares)

describe('projects actions', () => {
  let store: IStore<Partial<SchedulerForTogglAppState>>

  // Only one workspace ID is supported for now
  const workspaceId = faker.random.number()

  beforeEach(() => {
    // Mock the store with the initial state
    store = mockStore({
      projects: {
        workspaceId: null,
        projects: Array<Project>(),
        isFetching: false,
      },
    })

    // Initialise the mock Toggl client
    initTogglClient({})
  })

  describe('fetchWorkspaceProjects action', () => {
    it('performs the fetch completed action', () => {
      const expectedActionTypes = [
        fetchWorkspaceProjectsStarted.type,
        fetchWorkspaceProjectsComplete.type,
      ]

      store.dispatch(fetchWorkspaceProjects(workspaceId))
      expect(store.getActions().every((action) => {
        return _.includes(expectedActionTypes, action.type)
      })).toEqual(true)
    })
  })
})
