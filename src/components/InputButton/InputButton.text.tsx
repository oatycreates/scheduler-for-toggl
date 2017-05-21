import * as React from 'react'
import { shallow } from 'enzyme'
import InputButton from './InputButton'

describe('InputButton', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<InputButton />)
    expect(wrapper.find('.InputButton')).toHaveLength(1)
  })
})
