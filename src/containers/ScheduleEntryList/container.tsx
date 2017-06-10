import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { ScheduleEntry } from '../../reducers/scheduleEntries'
import ScheduleEntryPanel from '../../components/ScheduleEntryPanel'

/**
 * Prop type definitions
 */

export interface ScheduleEntryListContainerStateDispatches {

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

  renderScheduleEntries() {
    return (
      this.props.scheduleEntries.map((scheduleEntry: ScheduleEntry) => {
        return (
          <ScheduleEntryPanel
            key={scheduleEntry.id}
            scheduleName={scheduleEntry.scheduleName}
            startTime={moment(scheduleEntry.startTime)}
            endTime={moment(scheduleEntry.endTime)}
          />
        )
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
    // TODO: Add thunks for submitting individual or all schedule entries to Toggl
  }
}

const EnhancedScheduleEntryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleEntryListContainer)

export default EnhancedScheduleEntryList
