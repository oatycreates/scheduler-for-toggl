import * as React from 'react'
import { shallow } from 'enzyme'
import ScheduleEntryPanel from './ScheduleEntryPanel'

describe('ScheduleEntryPanel', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ScheduleEntryPanel />)
    expect(wrapper.find('.ScheduleEntryPanel')).toHaveLength(1)
  })
})
