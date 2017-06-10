import * as faker from 'faker'
import * as moment from 'moment'
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
      const startTime = moment().subtract(
        faker.random.number({ min: 1, max: 5 }),
        'hours',
      )
      const endTime = startTime.clone().add(
        faker.random.number({ min: 10, max: 15 }),
        'hours',
      )
      const newScheduleData = {
        scheduleName: newScheduleName,
        startTime: startTime.format(),
        endTime: endTime.format(),
      }
      const expectedActions = [
        addScheduleEntry(newScheduleData),
      ]

      store.dispatch(addScheduleEntry(newScheduleData))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
