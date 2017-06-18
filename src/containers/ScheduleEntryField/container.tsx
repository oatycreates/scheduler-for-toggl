import * as React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { addScheduleEntry } from '../../actions/scheduleEntries'
import ScheduleEntryField from './ScheduleEntryField'

/**
 * Prop type definitions
 */

export interface ScheduleEntryFieldContainerStateDispatches {
  onScheduleEntryCreate?: (scheduleName: string, startTime: string, endTime: string) => void,
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
  constructor(props: ScheduleEntryFieldContainerProps) {
    super(props)

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
    this.onScheduleEntryCreateClicked = this.onScheduleEntryCreateClicked.bind(this)
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

  onScheduleEntryCreateClicked() {
    if (this.props.onScheduleEntryCreate) {
      this.props.onScheduleEntryCreate(
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
        onScheduleEntryCreate={this.onScheduleEntryCreateClicked}
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
    onScheduleEntryCreate: (scheduleName: string, startTime: string, endTime: string) => {
      dispatch(addScheduleEntry({
        scheduleEntry: {
          scheduleName,
          startTime,
          endTime,
        },
      }))
    },
  }
}

const EnhancedScheduleEntryField = connect(
  null,
  mapDispatchToProps,
)(ScheduleEntryFieldContainer)

export default EnhancedScheduleEntryField
