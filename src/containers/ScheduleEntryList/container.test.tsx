import * as React from 'react'
import * as faker from 'faker'
import * as moment from 'moment'
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import ScheduleEntryList, { ScheduleEntryListContainerProps } from './container'
import { addScheduleEntry } from '../../actions/scheduleEntries'

describe('ScheduleEntryList container', () => {
  describe('using shallow rendering', () => {
    let container: ShallowWrapper<ScheduleEntryListContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = shallow(<Provider store={store}><ScheduleEntryList /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find(ScheduleEntryList)).toHaveLength(1)
    })
  })

  describe('when a schedule entry item is added', () => {
    const scheduleName = faker.lorem.sentence()
    let container: ReactWrapper<ScheduleEntryListContainerProps, {}>

    beforeEach(() => {
      const store = buildReduxStore()
      container = mount(<Provider store={store}><ScheduleEntryList /></Provider>)

      // Dispatch an action to create the schedule entry
      const startTime = moment().subtract(
        faker.random.number({ min: 1, max: 5 }),
        'hours',
      )
      const endTime = startTime.clone().add(
        faker.random.number({ min: 10, max: 15 }),
        'hours',
      )
      store.dispatch(addScheduleEntry({
        scheduleName,
        startTime: startTime.format(),
        endTime: endTime.format(),
      }))
    })

    it('displays the schedule entry', () => {
      expect(container.find('.ScheduleEntryPanel')).toHaveLength(1)
      expect(container.find('.ScheduleEntryPanel').text()).toContain(scheduleName)
    })
  })
})
