import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import schedulerForTogglApp, { SchedulerForTogglAppState, initialSchedulerForTogglAppState } from '../../reducers/'

/**
 * Builds a Redux store instance,
 */
export function buildReduxStore(initialState: SchedulerForTogglAppState = initialSchedulerForTogglAppState) {
  const middleware = [
    thunk,
  ]

  // Initialise the Redux store
  const store = createStore(schedulerForTogglApp, initialState, applyMiddleware(...middleware))

  return store
}
