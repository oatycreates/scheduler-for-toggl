import * as React from 'react'
import * as faker from 'faker'
import { shallow, render } from 'enzyme'
import ApiTokenField from './ApiTokenField'

describe('ApiTokenField', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ApiTokenField />)
    expect(wrapper.find('.ApiTokenField')).toHaveLength(1)
  })

  it('disables the submit button because the text input starts blank', () => {
    const wrapper = render(<ApiTokenField />)
    expect(wrapper.find('.Button').prop('disabled')).toEqual(true)
  })

  describe('when the user enters a value into the ApiTokenField', () => {
    const wrapper = render(<ApiTokenField apiToken={faker.random.alphaNumeric(16)} />)

    it('enables the submit button', () => {
      expect(wrapper.find('.Button').prop('disabled')).toEqual(false)
    })
  })
})
