import * as React from 'react'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'
import { ApiTokenFieldContainerProps } from './container'

import './ApiTokenField.css'

// Combine props from container with any custom ones this presentational component needs
export interface ApiTokenFieldProps extends ApiTokenFieldContainerProps {
  /**
   * The base onApiTokenSubmit dispatch can't be used here as the container
   * component binds a custom 'this' context.
   */
  onApiTokenSubmitClicked?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * Presentation component of the ApiTokenField,
 * @param props Properties generated from the container component via Redux binding.
 */
export const ApiTokenField: React.StatelessComponent<ApiTokenFieldProps> = (props) => {
  const errorText = (props.error && props.error.length > 0) ?
    (
      <p className="text-danger">
        Error occured when validating API key: {props.error}
      </p>
    ) : null
  const blankApiToken =
    typeof props.apiToken === 'undefined' || props.apiToken.length === 0

  return (
    <div className="ApiTokenField">
      <div className="input-group">
        <TextInput onChange={props.onApiTokenChange} placeholder="Enter your Toggl API key here.." />
        <span className="input-group-btn">
          <Button
            onClick={props.onApiTokenSubmitClicked}
            buttonStyle={ButtonStyles.primary}
            disabled={props.isValidating || blankApiToken}
            buttonText={props.isValidating ? 'Submitting..' : 'Submit'}
          />
        </span>
      </div>
      {errorText}
    </div>
  )
}

export default ApiTokenField
