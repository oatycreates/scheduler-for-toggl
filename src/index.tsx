import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import registerServiceWorker from './registerServiceWorker'
import schedulerForTogglApp, { initialSchedulerForTogglAppState } from './reducers'
import ScheduleEntryPage from './pages/ScheduleEntryPage'
import { APP_NAME } from './lib/appName'

/**
 * Redux middleware
 */

import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import filter from 'redux-localstorage-filter'
import * as adapter from 'redux-localstorage/lib/adapters/localStorage'

/**
 * Bootstrap jQuery plugin bindings:
 *
 * Note that React components based on Bootstrap JavaScript ones will have to
 * bind using the Bootstrap jQuery plugins in componentDidMount as they won't
 * exist on page load.
 */
import 'jquery'
import 'bootstrap/dist/js/bootstrap.js'

// Site styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'

/**
 * Initialise localstorage synchronisation middleware.
 * This is used to save the entered schedule entries between page loads.
 */
const reducer = compose(
  mergePersistedState(),
)(schedulerForTogglApp)

const storage = compose(
  // See: https://github.com/elgerlambert/redux-localstorage-filter
  filter([
    // This will store all keys in each schedule entry, a custom filtering
    // function may be needed in future to avoid synchronising state-specific
    // data such as API synchronisation information.
    'scheduleEntries.entries',
  ]),
)(adapter(window.localStorage))

// Set up the Redux DevTools, will only log in production
const composeEnhancers = composeWithDevTools({
  // redux-devtools-extension options here
})

const middlewares = [
  thunk,
]

// Initialise the Redux store
const store = createStore(
  reducer,
  initialSchedulerForTogglAppState,
  composeEnhancers(
    applyMiddleware(...middlewares),
    persistState(storage, _.kebabCase(APP_NAME)),
  ),
)

ReactDOM.render(
  // Binds the Redux store to make it available to all child components
  <Provider store={store}>
    <ScheduleEntryPage />
  </Provider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
