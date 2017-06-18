import * as faker from 'faker'
import * as moment from 'moment'
import { generateRandomScheduleEntry } from '../lib/testHelpers/scheduleEntry'
import { scheduleEntries, ScheduleEntry } from './scheduleEntries'
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
      scheduleEntries: {
        entries: Array<ScheduleEntry>(),
      },
    }
  })

  describe('addScheduleEntry action', () => {
    it('creates a valid entry when the schedule details are specified', () => {
      const scheduleEntryData = {
        scheduleEntry: generateRandomScheduleEntry(null),
      }

      state.scheduleEntries =
        scheduleEntries(state.scheduleEntries, addScheduleEntry(scheduleEntryData))

      const numScheduleEntries = state.scheduleEntries.entries.length
      const newScheduleEntry = state.scheduleEntries.entries[numScheduleEntries - 1]
      expect(numScheduleEntries).toEqual(1)
      expect(newScheduleEntry.scheduleName).toEqual(scheduleEntryData.scheduleEntry.scheduleName)
    })
  })
})
