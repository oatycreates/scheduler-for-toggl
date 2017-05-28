import * as React from 'react'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { changeApiToken, submitApiToken } from '../../actions/apiToken'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'

import './ApiTokenField.css'

/**
 * Prop type definitions
 */

export interface ApiTokenFieldDispatches {
  onApiTokenChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onApiTokenSubmit?: (apiToken: string) => void,
}

export interface ApiTokenFieldStateProps {
  apiToken: string
}

// Combine props from mapStateToProps and mapDispatchToProps with any component props
export interface ApiTokenFieldProps extends ApiTokenFieldStateProps, ApiTokenFieldDispatches {

}

/**
 * Component definition
 */

class ApiTokenField extends React.Component<ApiTokenFieldProps, {}> {
  static defaultProps: Partial<ApiTokenFieldProps> = {
    apiToken: '',
  }

  constructor() {
    super()

    // Bind context for handlers
    this.onApiTokenSubmitClicked = this.onApiTokenSubmitClicked.bind(this)
  }

  onApiTokenSubmitClicked() {
    if (this.props.onApiTokenSubmit) {
      this.props.onApiTokenSubmit(this.props.apiToken)
    }
  }

  render() {
    return (
      <div className="ApiTokenField">
        <TextInput onChange={this.props.onApiTokenChange} placeholder="Enter your Toggl API key here.." />
        <Button onClick={this.onApiTokenSubmitClicked} buttonStyle={ButtonStyles.primary} />
      </div>
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
const mapStateToProps = (state: SchedulerForTogglAppState): ApiTokenFieldStateProps => {
  // Extract the desired properties out of the state tree
  const { apiToken } = state
  return {
    apiToken: apiToken.apiToken,
  }
}

/**
 * Exposes the Redux dispatchers for certain actions to this.props.
 * @param dispatch Handle to the Redux Dispatch method.
 */
const mapDispatchToProps = (dispatch: Function): ApiTokenFieldDispatches => {
  return {
    onApiTokenChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeApiToken({apiToken: evt.target.value}))
    },
    onApiTokenSubmit: (apiToken: string | undefined) => {
      dispatch(submitApiToken(apiToken))
    },
  }
}

const EnhancedApiTokenField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApiTokenField)

export default EnhancedApiTokenField
