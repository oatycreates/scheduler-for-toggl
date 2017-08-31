import * as React from 'react'
import * as faker from 'faker'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'

import './ApiTokenField.scss'

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
  const hasBlankApiToken =
    typeof props.apiToken === 'undefined' || props.apiToken.length === 0

  return (
    <div className="ApiTokenField">
      <div className="input-group">
        <TextInput
          onChange={props.onApiTokenChange}
          placeholder={`${faker.random.alphaNumeric(16)}...`}
        />
        <span className="input-group-btn">
          <Button
            onClick={props.onApiTokenSubmit}
            buttonStyle={ButtonStyles.primary}
            disabled={props.isValidating || hasBlankApiToken}
            buttonText={props.isValidating ? 'Validating...' : 'Submit'}
          />
        </span>
      </div>
      {errorText}
    </div>
  )
}

export default ApiTokenField
