import * as moment from 'moment'
import { TimeEntry } from 'toggl-api'
import { ScheduleEntry } from '../../reducers/scheduleEntries'

/**
 * Finds the absolute date times that would suit the input relative start and end times.
 *
 * E.g.
 * If it is 6 PM and 10PM is entered, use today for the day component.
 * If it is 10PM and 3PM is entered, use tomorrow for the day component.
 *
 * @param startTime Relative start time to convert to an absolute datetime.
 * @param endTime Relative start time to convert to an absolute datetime.
 */
export function scheduleTimesToDateTimes(startTime: moment.Moment, endTime: moment.Moment) {
  const currentDateTime = moment()

  // Convert the date component of the input times to start from today
  const startDateTime = startTime
    .year(currentDateTime.year())
    .dayOfYear(currentDateTime.dayOfYear())
  const endDateTime = endTime
    .year(currentDateTime.year())
    .dayOfYear(currentDateTime.dayOfYear())

  // If the start time is before midnight one day and the end time is after
  // midnight on the next day, make the end date time go to the next day.
  if (endDateTime.isBefore(startDateTime)) {
    endDateTime.dayOfYear(startDateTime.dayOfYear() + 1)
  }

  if (startDateTime.isBefore(currentDateTime)) {
    // If it is 10PM and 3PM is entered, use the next day for the day component
    startDateTime.dayOfYear(startDateTime.dayOfYear() + 1)
    endDateTime.dayOfYear(endDateTime.dayOfYear() + 1)
  } else {
    // If it is 6 PM and 10PM is entered, use today for the day component
  }

  return {
    startDateTime,
    endDateTime,
  }
}

/**
 * Returns the Toggl API TimeEntry object based on the provided ScheduleEntry
 * for sending via Toggl API actions.
 * @param scheduleEntry Schedule entry to adapt to a Toggl API TimeEntry.
 */
export function scheduleEntryToTogglTimeEntry(scheduleEntry: ScheduleEntry): TimeEntry {
  const dateTimes = scheduleTimesToDateTimes(
    moment(scheduleEntry.startTime),
    moment(scheduleEntry.endTime)
  )
  const timeDuration = moment.duration(
    dateTimes.endDateTime.diff(dateTimes.startDateTime, 'milliseconds', true),
    'milliseconds'
  )
  return {
    description: scheduleEntry.scheduleName,
    start: dateTimes.startDateTime.toISOString(),
    stop: dateTimes.endDateTime.toISOString(),
    duration: timeDuration.asSeconds(),
  }
}
