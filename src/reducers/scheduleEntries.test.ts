import * as faker from 'faker'
import { scheduleEntries } from './scheduleEntries'
import { SchedulerForTogglAppState } from './'

/**
 * Action creators
 */

import {
  addScheduleEntry,
} from '../actions/scheduleEntries'

describe('scheduleEntries reducer', () => {
  let state: Partial<SchedulerForTogglAppState>

  beforeEach(() => {
    state = {
      scheduleEntries: [],
    }
  })

  describe('addScheduleEntry action', () => {
    it('creates a valid entry when the schedule details are specified', () => {
      const newScheduleName = faker.lorem.sentence()

      state.scheduleEntries =
        scheduleEntries(state.scheduleEntries, addScheduleEntry({scheduleName: newScheduleName}))
      expect(state.scheduleEntries.length).toEqual(1)
      const newScheduleEntry = state.scheduleEntries[state.scheduleEntries.length - 1]
      expect(newScheduleEntry.scheduleName).toEqual(newScheduleName)
    })
  })
})
