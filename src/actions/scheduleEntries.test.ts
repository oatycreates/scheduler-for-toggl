// Mock Toggl imports to prevent actual API access
jest.mock('../apiClients/TogglClient')

import * as faker from 'faker'
import * as _ from 'lodash'
import thunk from 'redux-thunk'
import configureStore, { IStore } from 'redux-mock-store'
import { generateRandomScheduleEntry } from '../lib/testHelpers/scheduleEntry'
import { SchedulerForTogglAppState } from '../reducers/'
import { ScheduleEntry } from '../reducers/scheduleEntries'
import { initTogglClient } from '../apiClients/TogglClient'

import {
  addScheduleEntry,
  removeScheduleEntry,
  submitScheduleEntryStarted,
  submitScheduleEntryComplete,
  submitScheduleEntryError,
  submitScheduleEntry,
  submitScheduleEntries,
} from './scheduleEntries'

// Initialise a mocked Redux store with relevant middleware
const middlewares = [thunk]
const mockStore = configureStore<Partial<SchedulerForTogglAppState>>(middlewares)

describe('scheduleEntries actions', () => {
  let store: IStore<Partial<SchedulerForTogglAppState>>
  beforeEach(() => {
    // Mock the store with the intial state
    store = mockStore({
      scheduleEntries: {
        entries: Array<ScheduleEntry>(),
      },
    })

    // Initialise the mock Toggl client
    initTogglClient({})
  })

  describe('addScheduleEntry action', () => {
    it('correctly performs the addScheduleEntry action', () => {
      const newScheduleEntryData = {
        scheduleEntry: generateRandomScheduleEntry(),
      }
      const expectedActions = [
        addScheduleEntry(newScheduleEntryData),
      ]

      store.dispatch(addScheduleEntry(newScheduleEntryData))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('removeScheduleEntry action', () => {
    it('correctly performs the removeScheduleEntry action', () => {
      const scheduleEntryToRemove = generateRandomScheduleEntry(faker.random.number())

      const expectedActions = [
        removeScheduleEntry({ scheduleEntryId: scheduleEntryToRemove.id }),
      ]

      store.dispatch(removeScheduleEntry({ scheduleEntryId: scheduleEntryToRemove.id }))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('submitScheduleEntry action', () => {
    describe('with valid schedule entry', () => {
      let scheduleEntry: ScheduleEntry
      beforeEach(() => {
        scheduleEntry = generateRandomScheduleEntry()
      })

      it('dispatches the submitScheduleEntryComplete action', () => {
        const expectedActions = [
          submitScheduleEntryStarted({ scheduleEntryId: scheduleEntry.id }),
          submitScheduleEntryComplete({ scheduleEntryId: scheduleEntry.id }),
        ]

        store.dispatch(submitScheduleEntry(scheduleEntry))
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('with a schedule entry that hasn\'t been saved', () => {
      let scheduleEntryNoId: ScheduleEntry
      beforeEach(() => {
        scheduleEntryNoId = generateRandomScheduleEntry(null)
      })

      it('dispatches the submitScheduleEntryError action', () => {
        const expectedActions = [
          submitScheduleEntryError({
            submitError: 'Schedule entry ID not present',
          }),
        ]

        store.dispatch(submitScheduleEntry(scheduleEntryNoId))
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('submitScheduleEntries action', () => {
    describe('with valid schedule entry', () => {
      let scheduleEntries: Array<ScheduleEntry>
      beforeEach(() => {
        scheduleEntries = _.times(3, () => generateRandomScheduleEntry())
      })

      it('dispatches the submitScheduleEntryComplete action for each schedule entry', () => {
        const expectedActions = _.flatMap(scheduleEntries, (scheduleEntry: ScheduleEntry) => {
          return [
            submitScheduleEntryStarted({ scheduleEntryId: scheduleEntry.id }),
            submitScheduleEntryComplete({ scheduleEntryId: scheduleEntry.id }),
          ]
        })

        store.dispatch(submitScheduleEntries(scheduleEntries))
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})
