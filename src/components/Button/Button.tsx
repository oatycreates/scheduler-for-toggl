import * as React from 'react'

import './Button.scss'

export enum ButtonStyles {
  default,
  primary,
  success,
  info,
  warning,
  danger,
  link,
}

export interface ButtonProps {
  buttonText?: string,
  disabled?: boolean,
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>,
  buttonStyle?: ButtonStyles,
}

/**
 * Returns the Bootstrap class name for the input button styling type.
 * @param buttonStyle Styling to use for the button.
 */
export const getClassNameForStyle = (buttonStyle: ButtonStyles | undefined) => {
  switch (buttonStyle) {
    case ButtonStyles.default:
      return 'btn-default'
    case ButtonStyles.primary:
      return 'btn-primary'
    case ButtonStyles.success:
      return 'btn-success'
    case ButtonStyles.info:
      return 'btn-info'
    case ButtonStyles.warning:
      return 'btn-warning'
    case ButtonStyles.danger:
      return 'btn-danger'
    case ButtonStyles.link:
      return 'btn-link'
    default:
      return 'btn-default'
  }
}

export const Button: React.StatelessComponent<ButtonProps> = (props) => {
  const cssClasses = [
    'Button',
    'btn',
    getClassNameForStyle(props.buttonStyle),
  ].join(' ')

  return (
    <button
      className={cssClasses}
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
  buttonStyle: ButtonStyles.default,
}

export default Button
