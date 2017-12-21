import * as React from 'react'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { Project } from '../../reducers/projects'
import { fetchWorkspaceProjects } from '../../actions/projects'
import ProjectDropdown from './ProjectDropdown'

/**
 * Prop type definitions
 */

export interface ProjectDropdownContainerPropsBase {
  initialSelectedProject?: Project | null,
  onChange?: (project: Project) => void,
}

export interface ProjectDropdownContainerStateDispatches {
  dispatchFetchWorkspaceProjects?: (workspaceId: number) => void,
}

export interface ProjectDropdownContainerStateProps {
  workspaceId: number | null,
  projects: Array<Project>,
  isFetching: boolean,
  error?: string,
}

// Combine props from mapStateToProps and mapDispatchToProps for container props
export type ProjectDropdownContainerProps =
ProjectDropdownContainerPropsBase & ProjectDropdownContainerStateProps & ProjectDropdownContainerStateDispatches

// Temporary project dropdown selection state is stored in the container to simplify storage
export interface ProjectDropdownContainerState {
  selectedProject: null | Project,
}

/**
 * Component definition
 */

class ProjectDropdownContainer extends
    React.Component<ProjectDropdownContainerProps, ProjectDropdownContainerState> {
  constructor(props: ProjectDropdownContainerProps) {
    super(props)

    // Initialise local component state
    this.state = {
      selectedProject: this.props.initialSelectedProject ? this.props.initialSelectedProject : null,
    }

    // Bind context for handlers
    this.onSelectedProjectChange = this.onSelectedProjectChange.bind(this)
    this.onProjectDropdownOpen = this.onProjectDropdownOpen.bind(this)
  }

  onSelectedProjectChange(newProject: Project | null) {
    this.setState({
      selectedProject: newProject,
    })

    if (this.props.onChange && newProject) {
      this.props.onChange(newProject)
    }
  }

  onProjectDropdownOpen() {
    // Grab projects if they aren't already present and can be fetched
    if (this.props.dispatchFetchWorkspaceProjects &&
        this.props.projects.length === 0 &&
        this.props.workspaceId !== null) {
      this.props.dispatchFetchWorkspaceProjects(this.props.workspaceId)
    }
  }

  render() {
    return (
      <ProjectDropdown
        projects={this.props.projects}
        selectedProject={this.state.selectedProject}
        isFetching={this.props.isFetching}
        error={this.props.error}
        onSelectedProjectChange={this.onSelectedProjectChange}
        onProjectDropdownOpen={this.onProjectDropdownOpen}
      />
    )
  }
}

/**
 * Redux bindings
 */

/**
 * Makes the desired properties from state available on this.props for the class.
 * @param state Full store state tree.
 */
const mapStateToProps = (state: SchedulerForTogglAppState): ProjectDropdownContainerStateProps => {
  // Extract the desired properties out of the state tree
  const { user, projects } = state
  return {
    projects: projects.projects,
    // Use the user's default workspace ID for now
    workspaceId: user.user ? user.user.defaultWorkspaceId : null,
    isFetching: projects.isFetching,
    error: projects.error,
  }
}

/**
 * Exposes the Redux dispatchers for certain actions to this.props.
 * @param dispatch Handle to the Redux Dispatch method.
 */
const mapDispatchToProps = (dispatch: Function): ProjectDropdownContainerStateDispatches => {
  return {
    dispatchFetchWorkspaceProjects: (workspaceId: number) => {
      dispatch(fetchWorkspaceProjects(workspaceId))
    },
  }
}

const EnhancedProjectDropdown = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDropdownContainer) as React.ComponentClass<ProjectDropdownContainerPropsBase>

export default EnhancedProjectDropdown
