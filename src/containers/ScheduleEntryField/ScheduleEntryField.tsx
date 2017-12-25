import * as React from 'react'
import * as faker from 'faker'
import * as moment from 'moment'
import * as _ from 'lodash'
import { Button, ButtonStyles } from '../../components/Button'
import { Project } from '../../reducers/projects'
import TextInput from '../../components/TextInput'
import TimePicker from '../../components/TimePicker'
import ProjectDropdown from '../ProjectDropdown'

import './ScheduleEntryField.scss'

export interface ScheduleEntryFieldProps {
  scheduleName?: string,
  startTime?: moment.Moment,
  endTime?: moment.Moment,
  project?: Project | null,
  onScheduleNameChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onStartTimeChange?: (time: moment.Moment) => void,
  onEndTimeChange?: (time: moment.Moment) => void,
  onProjectChange?: (project: Project) => void,
  onScheduleEntryCreate?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
}

/**
 * Presentation component of the ScheduleEntryField,
 * @param props Properties generated from the container component via Redux binding.
 */
export class ScheduleEntryField extends React.Component<ScheduleEntryFieldProps, {}> {
  render () {
    const hasBlankScheduleName =
      typeof this.props.scheduleName === 'undefined' || this.props.scheduleName.length === 0

    return (
      <div className="ScheduleEntryField">
        <div className="input-group">
          <TextInput
            onChange={this.props.onScheduleNameChange}
            placeholder={`${_.capitalize(faker.company.bsBuzz())} ${faker.company.bsNoun()}...`}
          />
          <TimePicker time={this.props.startTime} onChange={this.props.onStartTimeChange} />
          <TimePicker time={this.props.endTime} onChange={this.props.onEndTimeChange}/>
          <ProjectDropdown initialSelectedProject={this.props.project} onChange={this.props.onProjectChange}/>
          <span className="input-group-btn">
            <Button
              onClick={this.props.onScheduleEntryCreate}
              buttonStyle={ButtonStyles.primary}
              disabled={hasBlankScheduleName}
              buttonText="Add"
            />
          </span>
        </div>
      </div>
    )
  }
}

export default ScheduleEntryField
