import * as React from 'react'
import * as _ from 'lodash'
import { shallow } from 'enzyme'
import TextInput from './TextInput'

describe('TextInput', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TextInput />)
    expect(wrapper.find('.TextInput')).toHaveLength(1)
  })
  it('correctly binds the onChange event', () => {
    let textInputChangeCount = 0
    const testOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      textInputChangeCount++
    }
    const wrapper = shallow(<TextInput onChange={testOnChange} />)
    wrapper.find('.TextInput').simulate('change')
    expect(textInputChangeCount).toEqual(1)
  })
})
