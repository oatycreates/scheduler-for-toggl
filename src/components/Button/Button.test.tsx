import * as React from 'react'
import * as _ from 'lodash'
import { shallow } from 'enzyme'
import { Button, ButtonStyles, getClassNameForStyle } from './Button'

describe('Button', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('.Button')).toHaveLength(1)
  })
  it('correctly binds the onClick event', () => {
    let buttonClickCount = 0
    const testOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
      buttonClickCount++
    }
    const wrapper = shallow(<Button onClick={testOnClick} />)
    wrapper.find('.Button').simulate('click')
    expect(buttonClickCount).toEqual(1)
  })
  describe('with a customised style', () => {
    // Generate a test for each button style type
    _.each(ButtonStyles, (buttonStyle: ButtonStyles) => {
      // The ButtonStyles enum object will have two sets of keys, one for the actual
      // string values e.g. 'default', 'primary', etc. and one for numeric indexes.
      // We're only interested in iterating over the set once, pick the strings
      if (typeof(buttonStyle) === 'string' && ButtonStyles.hasOwnProperty(buttonStyle)) {
        it(`Style.${buttonStyle} causes \'${getClassNameForStyle(buttonStyle)}\' to appear on button`, () => {
          const wrapper = shallow(<Button buttonStyle={buttonStyle} />)
          expect(wrapper.find('.Button')).toHaveClassName(getClassNameForStyle(buttonStyle))
        })
      }
    })
  })
})
