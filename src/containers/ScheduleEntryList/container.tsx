import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { ScheduleEntry } from '../../reducers/scheduleEntries'
import { submitScheduleEntry, submitScheduleEntries } from '../../actions/scheduleEntries'
import { Button, ButtonStyles } from '../../components/Button'
import ScheduleEntryPanel from '../../components/ScheduleEntryPanel'

/**
 * Prop type definitions
 */

export interface ScheduleEntryListContainerStateDispatches {
  onScheduleEntrySubmit?: (scheduleEntry: ScheduleEntry) => void,
  onSubmitAllScheduleEntries?: (scheduleEntries: ReadonlyArray<ScheduleEntry>) => void,
}

export interface ScheduleEntryListContainerStateProps {
  scheduleEntries: Array<ScheduleEntry>,
  submitError?: string,
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

    // Bind context for handlers
    this.onSubmitAllScheduleEntries = this.onSubmitAllScheduleEntries.bind(this)
  }

  onSubmitAllScheduleEntries(event: React.MouseEvent<HTMLButtonElement>) {
    if (this.props.onSubmitAllScheduleEntries) {
      this.props.onSubmitAllScheduleEntries(this.props.scheduleEntries)
    }
  }

  renderScheduleEntry(scheduleEntry: ScheduleEntry) {
    // Bind the schedule entry submit function for this schedule entry panel
    const scheduleEntrySubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (this.props.onScheduleEntrySubmit) {
        this.props.onScheduleEntrySubmit(scheduleEntry)
      }
    }

    return (
      <div key={scheduleEntry.id}>
        <ScheduleEntryPanel
          scheduleName={scheduleEntry.scheduleName}
          startTime={moment(scheduleEntry.startTime)}
          endTime={moment(scheduleEntry.endTime)}
        />
        <Button
          buttonStyle={ButtonStyles.primary}
          onClick={scheduleEntrySubmit}
          buttonText="Submit"
        />
      </div>
    )
  }

  renderScheduleEntries() {
    const scheduleEntries = (
      this.props.scheduleEntries.map((scheduleEntry: ScheduleEntry) => {
        return this.renderScheduleEntry(scheduleEntry)
      })
    )
    const errorText = (this.props.submitError && this.props.submitError.length > 0) ?
      (
        <p className="text-danger">
          Error occured when submitting schedule entry: {this.props.submitError}
        </p>
      ) : null

    return (
      <div>
        {scheduleEntries}
        <Button
          buttonStyle={ButtonStyles.primary}
          onClick={this.onSubmitAllScheduleEntries}
          buttonText="Submit All"
        />
        {errorText}
      </div>
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
    scheduleEntries: scheduleEntries.entries,
    submitError: scheduleEntries.submitError,
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
    onSubmitAllScheduleEntries: (scheduleEntries: ReadonlyArray<ScheduleEntry>) => {
      dispatch(submitScheduleEntries(scheduleEntries))
    },
    // TODO: Add thunk for submitting all schedule entries to Toggl
  }
}

const EnhancedScheduleEntryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleEntryListContainer)

export default EnhancedScheduleEntryList
