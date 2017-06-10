import * as React from 'react'
import * as moment from 'moment'
import Timepicker, { TimepickerConfig, TimepickerTime } from 'react-timekeeper'

import './TimePicker.css'

export interface TimePickerProps {
  time?: moment.Moment,
  onChange?: (time: moment.Moment) => void,
  onDoneClick?: React.EventHandler<React.MouseEvent<HTMLSpanElement>>,
  switchToMinuteOnHourSelect?: boolean,
  closeOnMinuteSelect?: boolean,
  config?: TimepickerConfig,
  showPicker?: boolean
}

export interface TimePickerState {
  time: moment.Moment
  showPicker: boolean
}

export class TimePicker extends React.Component<TimePickerProps, TimePickerState> {
  static defaultProps = {
    switchToMinuteOnHourSelect: true,
    closeOnMinuteSelect: true,
    showPicker: false,
  }

  /**
   * Converts a Moment time to a TimepickerTime string.
   * @param time Moment time to convert.
   */
  static momentToTimepickerString(time: moment.Moment | undefined): string | undefined {
    return time ? time.format('h:mm a') : undefined
  }

  /**
   * Converts a TimepickerTime time to a Moment instance.
   * @param time TimepickerTime time to convert.
   */
  static timepickerTimeToMoment(time: TimepickerTime): moment.Moment {
    return moment(time.formatted24, 'HH:mm')
  }

  constructor(props: TimePickerProps) {
    super(props)

    // Set initial state
    this.state = {
      // Defaults to now unless time is specified
      time: props.time ? props.time : moment(),
      showPicker: typeof(props.showPicker) !== 'undefined' ? props.showPicker : false,
    }

    // Bind context for handlers
    this.onChange = this.onChange.bind(this)
    this.onDoneClick = this.onDoneClick.bind(this)
    this.toggleTimePicker = this.toggleTimePicker.bind(this)
  }

  onChange(time: TimepickerTime) {
    // Parse the TimepickerTime instance into a Moment time to improve utility
    const newTime = TimePicker.timepickerTimeToMoment(time)
    this.setState({
      time: newTime,
    })
  }

  /**
   * Called either when the 'Done' button is clicked, or when the minute is
   * picked and closeOnMinuteSelect is set to true.
   */
  onDoneClick(event: React.MouseEvent<HTMLSpanElement>) {
    this.setState({
      showPicker: false,
    })

    if (this.props.onDoneClick) {
      this.props.onDoneClick(event)
    }
  }

  /**
   * Opens or closes the time picker element.
   */
  toggleTimePicker() {
    this.setState({
      showPicker: !this.state.showPicker,
    })
  }

  renderTimePicker() {
    const timepickerTime = TimePicker.momentToTimepickerString(this.state.time)

    return (
      <Timepicker
        time={timepickerTime}
        onChange={this.onChange}
        onDoneClick={this.onDoneClick}
        switchToMinuteOnHourSelect={this.props.switchToMinuteOnHourSelect}
        closeOnMinuteSelect={this.props.closeOnMinuteSelect}
        config={this.props.config}
      />
    )

  }

  render() {
    return (
      <div className="TimePicker">
        <span onClick={this.toggleTimePicker}>
          {this.state.time.format('h:mm A')}
          &nbsp;<i className="fa fa-caret-down" aria-hidden="true" />
        </span>
        {this.state.showPicker ? this.renderTimePicker() : null}
      </div>
    )
  }
}

export default TimePicker
