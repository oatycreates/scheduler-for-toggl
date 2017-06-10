import * as faker from 'faker'
import configureStore, { IStore } from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SchedulerForTogglAppState, initialSchedulerForTogglAppState } from '../reducers/'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore<SchedulerForTogglAppState>(middlewares)

import {
  addScheduleEntry,
} from './scheduleEntries'

describe('scheduleEntries actions', () => {
  let store: IStore<SchedulerForTogglAppState>
  beforeEach(() => {
    // Mock the store with the intial state
    store = mockStore(initialSchedulerForTogglAppState)
  })

  describe('changeApiToken action', () => {
    it('correctly performs the changeApiToken action', () => {
      const newScheduleName = faker.lorem.sentence()
      const expectedActions = [
        addScheduleEntry({scheduleName: newScheduleName}),
      ]

      store.dispatch(addScheduleEntry({scheduleName: newScheduleName}))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
