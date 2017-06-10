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
   * Converts a Moment time to a TimepickerTime instance.
   * @param time Moment time to convert.
   */
  static momentToTimepickerTime(time: moment.Moment | undefined): TimepickerTime | undefined {
    const timepickerTime: TimepickerTime | undefined = time ? {
      hour24: Number.parseInt(time.format('HH')),
      minute: Number.parseInt(time.format('mm')),
    } : undefined
    return timepickerTime
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
    this.toggleTimePicker = this.toggleTimePicker.bind(this)
  }

  onChange(time: TimepickerTime) {
    // Parse the TimepickerTime instance into a Moment time to improve utility
    const newTime = TimePicker.timepickerTimeToMoment(time)
    this.setState({
      time: newTime,
      // Hide the picker now that a value has been chosen
      showPicker: false,
    })
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
    const timepickerTime = TimePicker.momentToTimepickerTime(this.props.time)

    return (
      <Timepicker
        time={timepickerTime}
        onChange={this.onChange}
        onDoneClick={this.props.onDoneClick}
        switchToMinuteOnHourSelect={this.props.switchToMinuteOnHourSelect}
        closeOnMinuteSelect={this.props.closeOnMinuteSelect}
        config={this.props.config}
      />
    )

  }

  render() {
    return (
      <div className="TimePicker">
        <span onClick={this.toggleTimePicker}>{this.state.time.format('h:mm A')}</span>
        {this.state.showPicker ? this.renderTimePicker() : null}
      </div>
    )
  }
}

export default TimePicker
