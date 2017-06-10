import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import ScheduleEntryList, { ScheduleEntryListContainerProps } from './container'

describe('ScheduleEntryList container', () => {
  describe('using shallow rendering', () => {
    let container: ShallowWrapper<ScheduleEntryListContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = shallow(<Provider store={store}><ScheduleEntryList /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find(ScheduleEntryList)).toHaveLength(1)
    })
  })
})
