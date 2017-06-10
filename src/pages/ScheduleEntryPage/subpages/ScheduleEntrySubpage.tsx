import * as React from 'react'
import ScheduleEntryField from '../../../containers/ScheduleEntryField'

export interface ScheduleEntrySubpageProps {

}

export const ScheduleEntrySubpage: React.StatelessComponent<ScheduleEntrySubpageProps> = (props) => {
  return (
    <div>
      <p>Valid API token!</p>
      <ScheduleEntryField />
    </div>
  )
}

export default ScheduleEntrySubpage
