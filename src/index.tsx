import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import registerServiceWorker from './registerServiceWorker'
import schedulerForTogglApp, { initialSchedulerForTogglAppState } from './reducers'
import ScheduleEntryPage from './pages/ScheduleEntryPage'

/**
 * Redux middleware
 */

import thunk from 'redux-thunk'

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

// Set up the Redux DevTools, will only log in production
const composeEnhancers = composeWithDevTools({
  // redux-devtools-extension options here
})

const middleware = [
  thunk,
]

// Initialise the Redux store
const store = createStore(
  schedulerForTogglApp,
  initialSchedulerForTogglAppState,
  composeEnhancers(
    applyMiddleware(...middleware),
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
