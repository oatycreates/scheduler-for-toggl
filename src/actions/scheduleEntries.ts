import { actionCreator } from './actionCreator'

/**
 * Action types
 */

const ADD_SCHEDULE_ENTRY = 'ADD_SCHEDULE_ENTRY'

/**
 * Action creators
 */

export const addScheduleEntry = actionCreator<{
  scheduleName: string,
  // ISO string formatted Moment strings
  startTime: string,
  endTime: string,
}>(ADD_SCHEDULE_ENTRY)
