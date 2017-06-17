import * as moment from 'moment'
import { Action, isType } from '../actions/actionCreator'
import { TimeEntry } from 'toggl-api'

/**
 * Action creators
 */

import {
  addScheduleEntry,
} from '../actions/scheduleEntries'

/**
 * Represents a schedule item with a start and end time.
 */
export interface ScheduleEntry {
  id?: number,
  scheduleName: string,
  // ISO string formatted Moment strings
  startTime: string,
  endTime: string,
  isSubmitting?: boolean,
  submitError?: string,
}

/**
 * Partial state type signature
 */
export type ScheduleEntriesState = Array<ScheduleEntry>

/**
 * Initial state of this reducer.
 */
export const initialScheduleEntriesState = Array<ScheduleEntry>() as ScheduleEntriesState

/**
 * Returns the partial state that has been altered by the input action.
 * @param scheduleEntries Existing partial state chunk for this reducer.
 * @param action Action to be handled by this reducer.
 */
export function scheduleEntries(
    scheduleEntries: ScheduleEntriesState = initialScheduleEntriesState, action: Action<{}>) {
  if (isType(action, addScheduleEntry)) {
    // Append the new schedule entry to the end of existing entries
    return [...scheduleEntries, {
      id: 1 + getMaxScheduleEntryId(scheduleEntries),
      scheduleName: action.payload.scheduleEntry.scheduleName,
      // ISO string formatted Moment times
      startTime: action.payload.scheduleEntry.startTime,
      endTime: action.payload.scheduleEntry.endTime,
    }]
  } else {
    return scheduleEntries
  }
}

/**
 * This is a relatively naive way of finding the maximum ID, if several schedule
 * entries are deleted off the end, IDs may be recycled. Due to the program
 * being all client side at this time and the IDs integrity not being essential
 * to maintain state, this is acceptable for now.
 * @param scheduleEntries List of schedule entries to find the maximum ID for.
 */
function getMaxScheduleEntryId(scheduleEntries: ReadonlyArray<ScheduleEntry>) {
  return scheduleEntries.reduce(
    (maxId, scheduleEntry) => Math.max(typeof(scheduleEntry.id) !== 'undefined' ? scheduleEntry.id : -1, maxId),
    -1,
  )
}

/**
 * Data converters
 */

export function scheduleEntryToTogglTimeEntry(scheduleEntry: ScheduleEntry): TimeEntry {
  const startTime = moment(scheduleEntry.startTime)
  const endTime = moment(scheduleEntry.endTime)
  return {
    description: scheduleEntry.scheduleName,
    start: startTime.toISOString(),
    stop: endTime.toISOString(),
    duration: moment.duration(endTime.diff(startTime, 'milliseconds', true), 'milliseconds').asSeconds(),
  }
}
