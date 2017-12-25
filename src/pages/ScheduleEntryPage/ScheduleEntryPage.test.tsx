import * as React from 'react'
import * as faker from 'faker'
import { render, mount, ReactWrapper } from 'enzyme'
import { Store, Provider } from 'react-redux'
import { buildReduxStore } from '../../lib/testHelpers/'
import { SchedulerForTogglAppState, initialSchedulerForTogglAppState } from '../../reducers/'
import ScheduleEntryPage, { ScheduleEntryPageStateProps } from './ScheduleEntryPage'

describe('ScheduleEntryPage', () => {
  describe('with a static rendered component', () => {
    let store: Store<SchedulerForTogglAppState>
    let container: Cheerio
    beforeEach(() => {
      store = buildReduxStore()
      container = render(<Provider store={store}><ScheduleEntryPage /></Provider>)
    })

    it('renders without crashing', () => {
      expect(container.find('.ScheduleEntryPage')).toHaveLength(1)
    })

    it('displays the ApiTokenField component', () => {
      expect(container.find('.ApiTokenField')).toHaveLength(1)
    })
  })

  describe('when a valid API token has been entered', () => {
    let container: ReactWrapper<ScheduleEntryPageStateProps, {}>
    beforeEach(() => {
      // Initialise store state
      const store = buildReduxStore(Object.assign({}, initialSchedulerForTogglAppState, {
        user: {
          apiToken: faker.random.alphaNumeric(16),
          isApiTokenValid: true,
        },
      } as Partial<SchedulerForTogglAppState>))
      container = mount(<Provider store={store}><ScheduleEntryPage /></Provider>)
    })

    it('doesn\'t display the API token entry field', () => {
      expect(container.find('.ApiTokenField')).toHaveLength(0)
    })

    it('displays the schedule entry field', () => {
      expect(container.find('.ScheduleEntryField')).toHaveLength(1)
    })
  })
})
