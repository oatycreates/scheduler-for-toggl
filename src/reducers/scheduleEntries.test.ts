import * as faker from 'faker'
import * as moment from 'moment'
import { generateRandomScheduleEntry } from '../lib/testHelpers/scheduleEntry'
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
      const scheduleEntryData = {
        scheduleEntry: generateRandomScheduleEntry(),
      }
      state.scheduleEntries =
        scheduleEntries(state.scheduleEntries, addScheduleEntry(scheduleEntryData))
      expect(state.scheduleEntries.length).toEqual(1)
      const newScheduleEntry = state.scheduleEntries[state.scheduleEntries.length - 1]
      expect(newScheduleEntry.scheduleName).toEqual(scheduleEntryData.scheduleEntry.scheduleName)
    })
  })
})
