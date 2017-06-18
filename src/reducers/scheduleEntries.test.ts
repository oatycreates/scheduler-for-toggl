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
  removeScheduleEntry,
  submitScheduleEntryStarted,
  submitScheduleEntryComplete,
  submitScheduleEntryError,
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

  describe('removeScheduleEntry action', () => {
    let scheduleEntry: ScheduleEntry
    beforeEach(() => {
      // Start with a schedule entry
      scheduleEntry = generateRandomScheduleEntry(null)
      state.scheduleEntries.entries = [scheduleEntry]
    })

    it('removes the provided entry when the schedule details are specified', () => {
      // Ensure the schedule entry exists before attempting the removal
      const scheduleEntryToRemove = state.scheduleEntries.entries.find((iterScheduleEntry: ScheduleEntry) => {
        return iterScheduleEntry.id === scheduleEntry.id
      })
      expect(scheduleEntryToRemove).not.toBeNull()

      // Remove the entry
      state.scheduleEntries = scheduleEntries(
        state.scheduleEntries,
        removeScheduleEntry({
          scheduleEntryId: scheduleEntry.id,
        }),
      )

      // Ensure the schedule entry has been removed
      const foundScheduleEntry = state.scheduleEntries.entries.find((iterScheduleEntry: ScheduleEntry) => {
        return iterScheduleEntry.id === scheduleEntry.id
      })
      expect(foundScheduleEntry).toBeUndefined()
    })
  })

  describe('submit schedule entry actions', () => {
    let scheduleEntry: ScheduleEntry
    beforeEach(() => {
      scheduleEntry = generateRandomScheduleEntry()
      state.scheduleEntries.entries = [scheduleEntry]
    })

    describe('submitScheduleEntryStarted action', () => {
      it('sets the submitting flag on the schedule entry', () => {
        state.scheduleEntries = scheduleEntries(
          state.scheduleEntries,
          submitScheduleEntryStarted({
            scheduleEntryId: scheduleEntry.id,
          }),
        )

        const modifiedScheduleEntry = state.scheduleEntries.entries.find((iterScheduleEntry: ScheduleEntry) => {
          return iterScheduleEntry.id === scheduleEntry.id
        })
        expect(modifiedScheduleEntry.isSubmitting).toEqual(true)
      })
    })

    describe('submitScheduleEntryComplete action', () => {
      it('clears the submitting flag on the schedule entry', () => {
        state.scheduleEntries = scheduleEntries(
          state.scheduleEntries,
          submitScheduleEntryComplete({
            scheduleEntryId: scheduleEntry.id,
          }),
        )

        const modifiedScheduleEntry = state.scheduleEntries.entries.find((iterScheduleEntry: ScheduleEntry) => {
          return iterScheduleEntry.id === scheduleEntry.id
        })
        expect(modifiedScheduleEntry.isSubmitting).toEqual(false)
      })
    })

    describe('submitScheduleEntryError action', () => {
      const submitError = faker.lorem.sentence()

      it('sets the schedule entries submit error message', () => {
        state.scheduleEntries = scheduleEntries(
          state.scheduleEntries,
          submitScheduleEntryError({
            submitError: submitError,
          }),
        )

        expect(state.scheduleEntries.submitError).toEqual(submitError)
      })
    })
  })
})
