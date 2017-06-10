import { actionCreator } from './actionCreator'

/**
 * Action types
 */

const ADD_SCHEDULE_ENTRY = 'ADD_SCHEDULE_ENTRY'

/**
 * Action creators
 */

export const addScheduleEntry = actionCreator<{scheduleName: string}>(ADD_SCHEDULE_ENTRY)
