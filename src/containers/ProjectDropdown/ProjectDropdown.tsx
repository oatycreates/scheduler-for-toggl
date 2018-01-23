import * as React from 'react'
import * as _ from 'lodash'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { Project } from '../../reducers/projects'

import './ProjectDropdown.css'

export interface ProjectDropdownProps {
  projects: Array<Project>,
  selectedProject: null | Project,
  isFetching: boolean,
  error?: string,
  onSelectedProjectChange?: (newProject: Project | null) => void,
  onProjectDropdownOpen?: () => void,
}

const ProjectToSelectEntry = (project: Project) => {
  return {
    value: project,
    label: project.name,
    ...project,
  }
}

const ProjectSelect = Select as new () => Select<Project>

/**
 * Presentation component of the ProjectDropdown,
 * @param props Properties generated from the container component via Redux binding.
 */
export const ProjectDropdown: React.StatelessComponent<ProjectDropdownProps> = (props) => {
  const projects = props.projects ? _.map(props.projects, (project) => {
    return ProjectToSelectEntry(project)
  }) : []

  const hasError = props.error ? props.error.length > 0 : false
  const errorText = (hasError) ? (
    <span>
      {props.error}
    </span>
  ) : null

  const placeholder = props.isFetching ? 'Fetching..' : 'Select project..'

  return (
    <div className="ProjectDropdown">
      <ProjectSelect
        placeholder={placeholder}
        options={projects}
        value={props.selectedProject ? ProjectToSelectEntry(props.selectedProject) : false}
        onChange={props.onSelectedProjectChange}
        onOpen={props.onProjectDropdownOpen}
      />
      {errorText}
    </div>
  )
}

export default ProjectDropdown
