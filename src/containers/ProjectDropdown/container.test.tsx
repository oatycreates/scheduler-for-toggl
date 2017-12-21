import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import ProjectDropdown, { ProjectDropdownContainerProps } from './container'

describe('ProjectDropdown container', () => {
  describe('using shallow rendering', () => {
    let container: ShallowWrapper<ProjectDropdownContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = shallow(<Provider store={store}><ProjectDropdown /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find(ProjectDropdown)).toHaveLength(1)
    })
  })
})
