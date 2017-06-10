// Type definitions for react-timekeeper v1.0.3
// Project: https://github.com/catc/react-timekeeper
// Definitions by: Patrick Ferguson <https://github.com/patferguson>

// TODO: Build typings for the react-timekeeper package and then remove this file

declare module 'react-timekeeper' {
  import * as React from 'react'

  export interface TimepickerTime {
    formatted?: string,
    formattedSimple?: string,
    formatted24?: string,
    hour?: number,
    hour24?: number,
    minute: number,
    meridiem?: number
  }

  export interface TimepickerConfig {
    // Main container
    TIMEPICKER_BACKGROUND?: string,
    FONT_FAMILY?: string,
    DONE_BUTTON_COLOR?: string,
    DONE_BUTTON_BORDER_COLOR?: string,

    // Time
    TIME_BACKGROUND?: string,
    TIME_DEFAULT_COLOR?: string,
    TIME_SELECTED_COLOR?: string,

    // Time dropdown
    DROPDOWN_BORDER?: string,
    DROPDOWN_COLOR?: string,
    DROPDOWN_SELECTED_COLOR?: string,

    // Clock wrapper
    CLOCK_WRAPPER_BACKGROUND?: string,
    CLOCK_WRAPPER_MERIDIEM_BACKGROUND?: string,
    CLOCK_WRAPPER_MERIDIEM_COLOR?: string,
    CLOCK_WRAPPER_MERIDIEM_COLOR_SELECTED?: string,

    // Clock
    CLOCK_BACKGROUND?: string,
    CLOCK_NUMBER_COLOR?: string,
    CLOCK_HAND_ARM?: string,
    CLOCK_HAND_CIRCLE_BACKGROUND?: string,
    CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND?: string,
  }

  export interface TimepickerProps {
    time?: string | TimepickerTime,
    onChange?: (time: TimepickerTime) => void,
    onDoneClick?: React.EventHandler<React.MouseEvent<HTMLSpanElement>>,
    switchToMinuteOnHourSelect?: boolean,
    closeOnMinuteSelect?: boolean,
    config?: TimepickerConfig
  }

  export interface TimepickerState extends TimepickerTime {
    unit?: 'hour' | 'minute'
  }

  export default class Timepicker extends React.Component<TimepickerProps, TimepickerState> { }
}
