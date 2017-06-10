import { Action, isType } from '../actions/actionCreator'

/**
 * Action creators
 */

import {
  addScheduleEntry,
} from '../actions/scheduleEntries'

/**
 * Partial state type signature
 */
export interface ScheduleEntry {
  id: number,
  scheduleName: string,
}

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
      // This is a relatively naive way of finding the maximum ID, if several
      // schedule entries are deleted off the end, IDs may be recycled. Due to
      // the program being all client side at this time and the IDs integrity
      // not being essential to maintain state, this is acceptable for now
      id: 1 + scheduleEntries.reduce(
        (maxId, scheduleEntry) => Math.max(scheduleEntry.id, maxId),
        -1,
      ),
      scheduleName: action.payload.scheduleName,
    }]
  } else {
    return scheduleEntries
  }
}
