import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { createStore, applyMiddleware } from 'redux'
import { Store, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import schedulerForTogglApp, { SchedulerForTogglAppState, initialSchedulerForTogglAppState } from '../../reducers/'
import ApiTokenField, { ApiTokenFieldContainerProps } from './container'

// Mock Toggl imports to prevent any actual API access
jest.mock('../../apiClients/TogglClient')

/**
 * Builds a Redux store instance,
 */
function buildReduxStore(initialState: SchedulerForTogglAppState = initialSchedulerForTogglAppState) {
  const middleware = [
    thunk,
  ]

  // Initialise the Redux store
  const store = createStore(schedulerForTogglApp, initialState, applyMiddleware(...middleware))

  return store
}

describe('ApiTokenField container', () => {
  describe('using shallow rendering', () => {
    let container: ShallowWrapper<ApiTokenFieldContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = shallow(<Provider store={store}><ApiTokenField /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find(ApiTokenField)).toHaveLength(1)
    })
  })
})
