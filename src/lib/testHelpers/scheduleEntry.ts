import * as faker from 'faker'
import * as moment from 'moment'
import { ScheduleEntry } from '../../reducers/scheduleEntries'

export function generateRandomScheduleEntry(overrideData?: ScheduleEntry): ScheduleEntry {
  const newScheduleName = faker.lorem.sentence()
  const startTime = moment().subtract(
    faker.random.number({ min: 1, max: 5 }),
    'hours',
  )
  const endTime = startTime.clone().add(
    faker.random.number({ min: 10, max: 15 }),
    'hours',
  )
  let newScheduleEntry = {
    scheduleName: newScheduleName,
    startTime: startTime.format(),
    endTime: endTime.format(),
  }

  // Apply any existing overrides
  return Object.assign(newScheduleEntry, overrideData)
}
