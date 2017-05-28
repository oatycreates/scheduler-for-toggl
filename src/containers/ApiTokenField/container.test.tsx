import * as React from 'react'
import * as _ from 'lodash'
import { shallow } from 'enzyme'
import { Store, Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { SchedulerForTogglAppState } from '../../reducers/'
import ApiTokenField from './container'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('ApiTokenField container', () => {
  let store: Store<SchedulerForTogglAppState>
  let container
  const initialState: Partial<SchedulerForTogglAppState> = {
    apiToken: {
      apiToken: '',
      error: '',
      isValid: false,
      isValidating: false,
    },
  }

  beforeEach(() => {
    store = mockStore(initialState)
    container = shallow(<Provider store={store}><ApiTokenField /></Provider> )
  })

  it('renders without crashing', () => {
    expect(container.find(ApiTokenField)).toHaveLength(1)
  })
})
