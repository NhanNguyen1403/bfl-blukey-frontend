import React from 'react';

import './Select.scss'

function Select({configs}) {
  let randomId = Math.random(),
    {name, value, style, data, isRequired, isDisable} = configs


  let updateSelected = (event) => {
    configs.value = event.target.value
  }


  return (
    <div className={`select-container ${style} ${isDisable ? 'disabled' : ''}`}>
      <label htmlFor={`${name}-${randomId}`}>
        {name}

        <span>
          {isRequired ? ' *' : ''}
        </span>
      </label>

      <select
        className={`select-container__select`}
        name={name}
        id={randomId}
        key={randomId}
        onChange={updateSelected}
        defaultValue={value}
      >
        {
          data.length > 0 && data.map(option => (
            <option
              key={Math.random()}
              value={option.value}
              placeholder={name}
            >
              {option.displayName}
            </option>
          ))
        }
      </select>
    </div>
  );
}

export default Select;
