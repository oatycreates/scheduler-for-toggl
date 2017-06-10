import * as React from 'react'
import * as faker from 'faker'
import { shallow, render, mount, ReactWrapper } from 'enzyme'
import ScheduleEntryField, { ScheduleEntryFieldProps } from './ScheduleEntryField'

describe('ScheduleEntryField', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ScheduleEntryField />)
    expect(wrapper.find('.ScheduleEntryField')).toHaveLength(1)
  })
})
