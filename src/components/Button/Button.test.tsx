import * as React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('Button', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('.Button')).toHaveLength(1)
  })
  it('correctly binds the onClick event', () => {
    let buttonClickCount = 0
    const testOnClick = (evt: React.MouseEvent<{}>) => {
      buttonClickCount++
    }
    const wrapper = shallow(<Button onClick={testOnClick} />)
    wrapper.find('.Button').simulate('click')
    expect(buttonClickCount).toEqual(1)
  })
})
