import * as React from 'react'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'

import './ApiTokenField.css'

export interface ApiTokenFieldProps {
  apiToken?: string,
  isValidating?: boolean,
  error?: string,
  onApiTokenChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onApiTokenSubmit?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
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
            onClick={props.onApiTokenSubmit}
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
