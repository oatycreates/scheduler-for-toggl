import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import ScheduleEntryField, { ScheduleEntryFieldContainerProps } from './container'

describe('ScheduleEntryField container', () => {
  describe('using shallow rendering', () => {
    let container: ShallowWrapper<ScheduleEntryFieldContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = shallow(<Provider store={store}><ScheduleEntryField /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find(ScheduleEntryField)).toHaveLength(1)
    })
  })
})
