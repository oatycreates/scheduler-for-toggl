import * as React from 'react'

import './TextInput.css'

export interface TextInputProps {
  placeholder?: string,
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>,
}

export const TextInput: React.StatelessComponent<TextInputProps> = (props) => {
  return (
    <input
      className="TextInput form-control"
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}
TextInput.defaultProps = {
  placeholder: '',
}

export default TextInput
