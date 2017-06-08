import * as React from 'react'
import { shallow } from 'enzyme'
import ScheduleEntryPage from './ScheduleEntryPage'

describe('ScheduleEntryPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ScheduleEntryPage />)
    expect(wrapper.find('.ScheduleEntryPage')).toHaveLength(1)
  })
})
