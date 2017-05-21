import * as React from 'react'

import './InputButton.css'

export interface InputButtonProps {
  buttonText?: string,
  disabled?: boolean
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export const InputButton: React.StatelessComponent<InputButtonProps> = (props) => {
  return (
    <button
      className="InputButton"
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  )
}
InputButton.propTypes = {
  buttonText: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
}
InputButton.defaultProps = {
  buttonText: 'Submit',
  disabled: false,
}

export default InputButton
