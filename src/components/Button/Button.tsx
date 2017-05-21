import * as React from 'react'

import './Button.css'

export enum Styles {
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
  style?: Styles,
}

/**
 * Returns the Bootstrap class name for the input button styling type.
 * @param style Styling to use for the button.
 */
export const getClassNameForStyle = (style: Styles | undefined) => {
  switch (style) {
    case Styles.default:
      return 'btn-default'
    case Styles.primary:
      return 'btn-primary'
    case Styles.success:
      return 'btn-success'
    case Styles.info:
      return 'btn-info'
    case Styles.warning:
      return 'btn-warning'
    case Styles.danger:
      return 'btn-danger'
    case Styles.link:
      return 'btn-link'
    default:
      return 'btn-default'
  }
}

export const Button: React.StatelessComponent<ButtonProps> = (props) => {
  const cssClasses = [
    'Button',
    'btn',
    getClassNameForStyle(props.style),
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
  style: Styles.default,
}

export default Button
