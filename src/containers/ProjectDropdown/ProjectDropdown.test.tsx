import * as React from 'react'
import * as faker from 'faker'
import { shallow, render, mount, ReactWrapper } from 'enzyme'
import ProjectDropdown, { ProjectDropdownProps } from './ProjectDropdown'

describe('ProjectDropdown', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ProjectDropdown />)
    expect(wrapper.find('.ProjectDropdown')).toHaveLength(1)
  })
})
