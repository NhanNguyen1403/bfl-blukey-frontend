import React from 'react';
import "./Input.scss"

function Input(props) {
  let {labelName, type, size, isRequired} = props.configs

  const validate = (newValue) => {
    if (isRequired && !newValue)
      return props.configs.setIsValid = false

    props.configs.setIsValid = true
    props.configs.setValue = newValue
  }

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
