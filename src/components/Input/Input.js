import React from 'react';
import "./Input.scss"

function Input(props) {
  let {type, size, labelName, isRequired, isValid} = props
  let value = ''

  const validate = (newValue) => {
    if (isRequired && !newValue)
      return isValid = false

    return value = newValue
  }

  // const getValue = () => {
  //   return value
  // }

  return (
    <div className={`input-container ${size}`}>
      <label htmlFor={`${labelName}`}>
        {labelName}

        <span>
          {isRequired ? ' *' : ''}
        </span>
      </label>

      <input
        id={labelName}
        placeholder={labelName}
        type={type}
        onBlur={e => validate(e.target.value)}
      />
    </div>
  );
}

export default Input;
