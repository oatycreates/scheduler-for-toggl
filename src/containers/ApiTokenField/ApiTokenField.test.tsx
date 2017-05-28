import * as React from 'react'
import * as _ from 'lodash'
import { shallow } from 'enzyme'
import ApiTokenField from './ApiTokenField'

describe('ApiTokenField', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ApiTokenField />)
    expect(wrapper.find('.ApiTokenField')).toHaveLength(1)
  })
})
