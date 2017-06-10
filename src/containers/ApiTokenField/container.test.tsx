import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import ApiTokenField, { ApiTokenFieldContainerProps } from './container'

// Mock Toggl imports to prevent any actual API access
jest.mock('../../apiClients/TogglClient')

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
