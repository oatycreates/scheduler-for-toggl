import * as faker from 'faker'
import * as moment from 'moment'
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

      const startTime = moment().subtract(
        faker.random.number({ min: 1, max: 5 }),
        'hours',
      )
      const endTime = startTime.clone().add(
        faker.random.number({ min: 10, max: 15 }),
        'hours',
      )
      state.scheduleEntries =
        scheduleEntries(state.scheduleEntries, addScheduleEntry({
          scheduleEntry: {
            scheduleName: newScheduleName,
            startTime: startTime.format(),
            endTime: endTime.format(),
          },
        }))
      expect(state.scheduleEntries.length).toEqual(1)
      const newScheduleEntry = state.scheduleEntries[state.scheduleEntries.length - 1]
      expect(newScheduleEntry.scheduleName).toEqual(newScheduleName)
    })
  })
})
