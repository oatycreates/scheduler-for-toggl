import * as React from 'react'
import { connect } from 'react-redux'
import { addScheduleEntry } from '../../actions/scheduleEntries'
import ScheduleEntryField from './ScheduleEntryField'

/**
 * Prop type definitions
 */

export interface ScheduleEntryFieldContainerStateDispatches {
  onScheduleEntrySubmit?: (apiToken: string) => void,
}

export interface ScheduleEntryFieldContainerStateProps {
}

// Combine props from mapStateToProps and mapDispatchToProps for container props
export type ScheduleEntryFieldContainerProps =
  ScheduleEntryFieldContainerStateProps & ScheduleEntryFieldContainerStateDispatches

// Temporary schedule entry field state is stored in the container to simplify storage
export interface ScheduleEntryFieldContainerState {
  scheduleName: string
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
    }

    // Bind context for handlers
    this.onScheduleNameChange = this.onScheduleNameChange.bind(this)
    this.onScheduleEntrySubmitClicked = this.onScheduleEntrySubmitClicked.bind(this)
  }

  onScheduleEntrySubmitClicked() {
    if (this.props.onScheduleEntrySubmit) {
      this.props.onScheduleEntrySubmit(this.state.scheduleName)
    }
  }

  onScheduleNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      scheduleName: evt.target.value,
    })
  }

  render() {
    return (
      <ScheduleEntryField
        scheduleName={this.state.scheduleName}
        onScheduleNameChange={this.onScheduleNameChange}
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
    onScheduleEntrySubmit: (scheduleName: string) => {
      dispatch(addScheduleEntry({scheduleName}))
    },
  }
}

const EnhancedScheduleEntryField = connect(
  null,
  mapDispatchToProps,
)(ScheduleEntryFieldContainer)

export default EnhancedScheduleEntryField
