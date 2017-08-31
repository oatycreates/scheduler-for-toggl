import * as React from 'react'
import * as moment from 'moment'

import './ScheduleEntryPanel.scss'

export interface ScheduleEntryPanelProps {
  scheduleName?: string,
  startTime?: moment.Moment,
  endTime?: moment.Moment,
}

export const ScheduleEntryPanel: React.StatelessComponent<ScheduleEntryPanelProps> = (props) => {
  return (
    <div className="ScheduleEntryPanel">
      {props.scheduleName}<br />
      {props.startTime ? props.startTime.format('h:mm A') : ''}
      &nbsp;-&nbsp;
      {props.endTime ? props.endTime.format('h:mm A') : ''}
    </div>
  )
}
ScheduleEntryPanel.defaultProps = {
  scheduleName: 'Invalid schedule name',
}

export default ScheduleEntryPanel
