import * as faker from 'faker'
import * as moment from 'moment'
import { ScheduleEntry } from '../../reducers/scheduleEntries'
import { generateRandomScheduleEntry } from '../testHelpers/scheduleEntry'
import { scheduleEntryToTogglTimeEntry, scheduleTimesToDateTimes } from './scheduleEntries'

describe('DataConverter - ScheduleEntries', () => {
  describe('scheduleEntryToTogglTimeEntry', () => {
    const scheduleEntry = generateRandomScheduleEntry(null)

    it('generates a Toggl time entry with fields set', () => {
      const timeEntry = scheduleEntryToTogglTimeEntry(scheduleEntry)

      expect(timeEntry.description).toContain(scheduleEntry.scheduleName)
      // Expect time fields to not be blank
      expect(timeEntry.start).not.toHaveLength(0)
      expect(timeEntry.stop).not.toHaveLength(0)
      expect(timeEntry.duration).not.toBeNull()
    })
  })

  describe('scheduleTimesToDateTimes', () => {
    describe('when a time before the current time is entered', () => {
      const startTime = moment()
        .subtract(4, 'days') // To ensure that the times will actually be checked
        .subtract(
          faker.random.number({ min: 1, max: 8}),
          // Use minutes as there is less chance that the specs will fail due to
          // day boundaries when run around midnight
          'minutes',
        )
      const endTime = startTime.clone().add(
        faker.random.number({ min: 1, max: 8}),
        'minutes',
      )

      it('returns an absolute date time with day component set to tomorrow', () => {
        const dateTimes = scheduleTimesToDateTimes(startTime, endTime)
        expect(dateTimes.startDateTime.dayOfYear()).toBe(moment().dayOfYear() + 1)
      })
    })

    describe('when a time after the current time is entered', () => {
      const startTime = moment()
        .subtract(4, 'days') // To ensure that the times will actually be checked
        .add(
          faker.random.number({ min: 1, max: 8}),
          // Use minutes as there is less chance that the specs will fail due to
          // day boundaries when run around midnight
          'minutes',
        )
      const endTime = startTime.clone().add(
        faker.random.number({ min: 1, max: 8}),
        'minutes',
      )

      it('returns an absolute date time with day component set to today', () => {
        const dateTimes = scheduleTimesToDateTimes(startTime, endTime)
        expect(dateTimes.startDateTime.dayOfYear()).toBe(moment().dayOfYear())
      })
    })

    describe('when the start time is before midnight and the start time is after midnight', () => {
      const startTime = moment()
        .startOf('day')
        .subtract(4, 'days') // To ensure that the times will actually be checked
        .add(
          faker.random.number({ min: 5, max: 10}),
          'hours',
        )
      // End time should be 'before' start time to simulate it being past midnight the next day
      const endTime = startTime.clone()
        .subtract(faker.random.number({ min: 1, max: 4}), 'hours')

      it('sets the day of the end time to one day after the start time', () => {
        const dateTimes = scheduleTimesToDateTimes(startTime, endTime)
        expect(dateTimes.endDateTime.dayOfYear()).toBe(
          dateTimes.startDateTime.dayOfYear() + 1
        )
      })
    })
  })
})
