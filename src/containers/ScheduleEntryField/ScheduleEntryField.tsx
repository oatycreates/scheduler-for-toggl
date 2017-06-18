import * as React from 'react'
import * as faker from 'faker'
import * as moment from 'moment'
import * as _ from 'lodash'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'
import TimePicker from '../../components/TimePicker'

import './ScheduleEntryField.css'

export interface ScheduleEntryFieldProps {
  scheduleName?: string,
  startTime?: moment.Moment,
  endTime?: moment.Moment,
  onScheduleNameChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onStartTimeChange?: (time: moment.Moment) => void,
  onEndTimeChange?: (time: moment.Moment) => void,
  onScheduleEntryCreate?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
}

/**
 * Presentation component of the ScheduleEntryField,
 * @param props Properties generated from the container component via Redux binding.
 */
export const ScheduleEntryField: React.StatelessComponent<ScheduleEntryFieldProps> = (props) => {
  const hasBlankScheduleName =
    typeof props.scheduleName === 'undefined' || props.scheduleName.length === 0

  return (
    <div className="ScheduleEntryField">
      <div className="input-group">
        <TextInput
          onChange={props.onScheduleNameChange}
          placeholder={`${_.capitalize(faker.company.bsBuzz())} ${faker.company.bsNoun()}...`}
        />
        <TimePicker time={props.startTime} onChange={props.onStartTimeChange} />
        <TimePicker time={props.endTime} onChange={props.onEndTimeChange}/>
        <span className="input-group-btn">
          <Button
            onClick={props.onScheduleEntryCreate}
            buttonStyle={ButtonStyles.primary}
            disabled={hasBlankScheduleName}
            buttonText="Add"
          />
        </span>
      </div>
    </div>
  )
}

export default ScheduleEntryField
