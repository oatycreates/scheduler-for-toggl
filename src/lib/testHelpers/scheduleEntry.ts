import * as faker from 'faker'
import * as moment from 'moment'
import { ScheduleEntry } from '../../reducers/scheduleEntries'

export function generateRandomScheduleEntry(
    id: number | null = 0,
    overrideData?: Partial<ScheduleEntry>): ScheduleEntry {
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
  } as ScheduleEntry

  // Allow for some tests not explicitely not define the ID for the schedule entry
  if (id !== null) {
    newScheduleEntry.id = id
  }

  // Apply any existing overrides
  return Object.assign(newScheduleEntry, overrideData)
}
