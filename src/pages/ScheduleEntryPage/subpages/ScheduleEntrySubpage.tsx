import * as React from 'react'
import ScheduleEntryField from '../../../containers/ScheduleEntryField'
import ScheduleEntryList from '../../../containers/ScheduleEntryList'

export interface ScheduleEntrySubpageProps {

}

export const ScheduleEntrySubpage: React.StatelessComponent<ScheduleEntrySubpageProps> = (props) => {
  return (
    <div>
      <p>Valid API token!</p>
      <ScheduleEntryField />
      <ScheduleEntryList />
    </div>
  )
}

export default ScheduleEntrySubpage
