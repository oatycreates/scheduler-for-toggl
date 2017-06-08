import * as React from 'react'
import * as faker from 'faker'
import { shallow, render, mount, ReactWrapper } from 'enzyme'
import ApiTokenField, { ApiTokenFieldProps } from './ApiTokenField'

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
    let wrapper: Cheerio
    beforeEach(() => {
      wrapper = render(<ApiTokenField apiToken={faker.random.alphaNumeric(16)} />)
    })

    it('enables the submit button', () => {
      expect(wrapper.find('.Button').prop('disabled')).toEqual(false)
    })
  })

  describe('when the user clicks the submit button', () => {
    let wrapper: ReactWrapper<ApiTokenFieldProps, {}>
    let onApiTokenSubmit: jest.Mock<{}>
    beforeEach(() => {
      onApiTokenSubmit = jest.fn()
      wrapper = mount(
        <ApiTokenField
          apiToken={faker.random.alphaNumeric(16)}
          onApiTokenSubmit={onApiTokenSubmit}
        />)
    })

    it('triggers the onApiTokenSubmit callback', () => {
      wrapper.find('.Button').simulate('click')
      expect(onApiTokenSubmit.mock.calls.length).toEqual(1)
    })
  })
})
