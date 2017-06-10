import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { addScheduleEntry } from '../../actions/scheduleEntries'
import ScheduleEntryField from './ScheduleEntryField'

/**
 * Prop type definitions
 */

export interface ScheduleEntryFieldContainerStateDispatches {
  onScheduleEntrySubmit?: (scheduleName: string, startTime: string, endTime: string) => void,
}

export interface ScheduleEntryFieldContainerStateProps {
}

// Combine props from mapStateToProps and mapDispatchToProps for container props
export type ScheduleEntryFieldContainerProps =
  ScheduleEntryFieldContainerStateProps & ScheduleEntryFieldContainerStateDispatches

// Temporary schedule entry field state is stored in the container to simplify storage
export interface ScheduleEntryFieldContainerState {
  scheduleName: string,
  startTime: moment.Moment,
  endTime: moment.Moment,
}

/**
 * Component definition
 */

class ScheduleEntryFieldContainer extends
    React.Component<ScheduleEntryFieldContainerProps, ScheduleEntryFieldContainerState> {
  constructor() {
    super()

    // Initialise local component state
    this.state = {
      scheduleName: '',
      startTime: moment(),
      endTime: moment().add(5, 'minutes'),
    }

    // Bind context for handlers
    this.onScheduleNameChange = this.onScheduleNameChange.bind(this)
    this.onStartTimeChange = this.onStartTimeChange.bind(this)
    this.onEndTimeChange = this.onEndTimeChange.bind(this)
    this.onScheduleEntrySubmitClicked = this.onScheduleEntrySubmitClicked.bind(this)
  }

  onScheduleNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      scheduleName: evt.target.value,
    })
  }

  onStartTimeChange(time: moment.Moment) {
    this.setState({
      startTime: time,
    })
  }

  onEndTimeChange(time: moment.Moment) {
    this.setState({
      endTime: time,
    })
  }

  onScheduleEntrySubmitClicked() {
    if (this.props.onScheduleEntrySubmit) {
      this.props.onScheduleEntrySubmit(
        this.state.scheduleName,
        // ISO string formatted Moment times
        this.state.startTime.format(),
        this.state.endTime.format(),
      )
    }
  }

  render() {
    return (
      <ScheduleEntryField
        scheduleName={this.state.scheduleName}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        onScheduleNameChange={this.onScheduleNameChange}
        onStartTimeChange={this.onStartTimeChange}
        onEndTimeChange={this.onEndTimeChange}
        onScheduleEntrySubmit={this.onScheduleEntrySubmitClicked}
      />
    )
  }
}

/**
 * Redux bindings
 */

/**
 * Exposes the Redux dispatchers for certain actions to this.props.
 * @param dispatch Handle to the Redux Dispatch method.
 */
const mapDispatchToProps = (dispatch: Function): ScheduleEntryFieldContainerStateDispatches => {
  return {
    onScheduleEntrySubmit: (scheduleName: string, startTime: string, endTime: string) => {
      dispatch(addScheduleEntry({
        scheduleName,
        startTime,
        endTime,
      }))
    },
  }
}

const EnhancedScheduleEntryField = connect(
  null,
  mapDispatchToProps,
)(ScheduleEntryFieldContainer)

export default EnhancedScheduleEntryField
