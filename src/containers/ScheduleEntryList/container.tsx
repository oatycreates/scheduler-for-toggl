import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { ScheduleEntry } from '../../reducers/scheduleEntries'
import { submitScheduleEntry } from '../../actions/scheduleEntries'
import ScheduleEntryPanel from '../../components/ScheduleEntryPanel'
import Button from '../../components/Button'

/**
 * Prop type definitions
 */

export interface ScheduleEntryListContainerStateDispatches {
  onScheduleEntrySubmit?: (scheduleEntry: ScheduleEntry) => void,
}

export interface ScheduleEntryListContainerStateProps {
  scheduleEntries: Array<ScheduleEntry>
}

// Combine props from mapStateToProps and mapDispatchToProps for container props
export type ScheduleEntryListContainerProps =
  ScheduleEntryListContainerStateProps & ScheduleEntryListContainerStateDispatches

/**
 * Component definition
 */

class ScheduleEntryListContainer extends
    React.Component<ScheduleEntryListContainerProps, {}> {
  constructor(props: ScheduleEntryListContainerProps) {
    super(props)
  }

  renderScheduleEntry(scheduleEntry: ScheduleEntry) {
    // Bind the schedule entry submit function for this schedule entry panel
    const scheduleEntrySubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (this.props.onScheduleEntrySubmit) {
        this.props.onScheduleEntrySubmit(scheduleEntry)
      }
    }
    const errorText = (scheduleEntry.submitError && scheduleEntry.submitError.length > 0) ?
      (
        <p className="text-danger">
          Error occured when submitting schedule entry: {scheduleEntry.submitError}
        </p>
      ) : null

    return (
      <div key={scheduleEntry.id}>
        <ScheduleEntryPanel
          scheduleName={scheduleEntry.scheduleName}
          startTime={moment(scheduleEntry.startTime)}
          endTime={moment(scheduleEntry.endTime)}
        />
        <Button
          onClick={scheduleEntrySubmit}
          buttonText="Submit"
        />
        {errorText}
      </div>
    )
  }

  renderScheduleEntries() {
    return (
      this.props.scheduleEntries.map((scheduleEntry: ScheduleEntry) => {
        return this.renderScheduleEntry(scheduleEntry)
      })
    )
  }

  render() {
    const hasScheduleEntries = this.props.scheduleEntries && this.props.scheduleEntries.length > 0

    return (
      <div className="ScheduleEntryList">
        {(hasScheduleEntries) ? this.renderScheduleEntries() : null}
      </div>
    )
  }
}

/**
 * Redux bindings
 */

/**
 * Makes the desired properties from state available on this.props for the class.
 * @param state Full store state tree.
 */
const mapStateToProps = (state: SchedulerForTogglAppState): ScheduleEntryListContainerStateProps => {
  // Extract the desired properties out of the state tree
  const { scheduleEntries } = state
  return {
    scheduleEntries,
  }
}

/**
 * Exposes the Redux dispatchers for certain actions to this.props.
 * @param dispatch Handle to the Redux Dispatch method.
 */
const mapDispatchToProps = (dispatch: Function): ScheduleEntryListContainerStateDispatches => {
  return {
    onScheduleEntrySubmit: (scheduleEntry: ScheduleEntry) => {
      dispatch(submitScheduleEntry(scheduleEntry))
    },
    // TODO: Add thunk for submitting all schedule entries to Toggl
  }
}

const EnhancedScheduleEntryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleEntryListContainer)

export default EnhancedScheduleEntryList
