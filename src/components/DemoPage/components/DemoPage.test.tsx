import * as React from 'react'
import { shallow } from 'enzyme'
import DemoPage from './DemoPage'

describe('DemoPage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DemoPage />)
    expect(wrapper.find('.DemoPage')).toHaveLength(1)
  })
})
