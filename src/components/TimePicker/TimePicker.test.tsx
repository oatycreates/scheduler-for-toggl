import * as React from 'react'
import * as faker from 'faker'
import * as moment from 'moment'
import { shallow, ShallowWrapper } from 'enzyme'
import TimePicker, { TimePickerProps, TimePickerState } from './TimePicker'

describe('TimePicker', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TimePicker />)
    expect(wrapper.find('.TimePicker')).toHaveLength(1)
  })

  describe('when a time is supplied', () => {
    let wrapper: ShallowWrapper<TimePickerProps, TimePickerState>
    const time = moment('9:15 PM', 'hh:mm A')
    beforeEach(() => {
      wrapper = shallow(<TimePicker time={time} />)
    })

    it ('renders the correct time', () => {
      expect(wrapper.find('.TimePicker').text()).toContain(time.format('h:mm A'))
    })
  })
})
