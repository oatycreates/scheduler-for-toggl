import * as React from 'react'

import './Button.css'

export interface ButtonProps {
  buttonText?: string,
  disabled?: boolean
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>
}

export const Button: React.StatelessComponent<ButtonProps> = (props) => {
  return (
    <button
      className="Button"
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  )
}
Button.defaultProps = {
  buttonText: 'Submit',
  disabled: false,
}

export default Button
