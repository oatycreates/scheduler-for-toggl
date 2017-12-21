import * as React from 'react'
import * as moment from 'moment'
import { Project } from '../../reducers/projects'

import './ScheduleEntryPanel.css'

export interface ScheduleEntryPanelProps {
  scheduleName?: string,
  startTime?: moment.Moment,
  endTime?: moment.Moment,
  project: Project,
}

export const ScheduleEntryPanel: React.StatelessComponent<ScheduleEntryPanelProps> = (props) => {
  let title = props.scheduleName
  if (props.project) {
    title += ` - ${props.project.name}`
  }

  return (
    <div className="ScheduleEntryPanel">
      {title}<br />
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
