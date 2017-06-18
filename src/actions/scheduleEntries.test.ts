import * as faker from 'faker'
import thunk from 'redux-thunk'
import configureStore, { IStore } from 'redux-mock-store'
import { generateRandomScheduleEntry } from '../lib/testHelpers/scheduleEntry'
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

  describe('addScheduleEntry action', () => {
    it('correctly performs the addScheduleEntry action', () => {
      const newScheduleEntryData = {
        scheduleEntry: generateRandomScheduleEntry(),
      }
      const expectedActions = [
        addScheduleEntry(newScheduleEntryData),
      ]

      store.dispatch(addScheduleEntry(newScheduleEntryData))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
