/***********************************************************
 * 1. Received an input config with generateInput service
 ***********************************************************/

import React from 'react';
import "./Input.scss"
import Chip from "../Chip/Chip";
import {generateChip} from '../../services/generateChip'

function Input(props) {
	let {labelName, type, size, isRequired} = props.configs,
			shortInput = generateChip(`${labelName} too short.`, 'error')


	const validate = (newValue) => {
		if (isRequired && newValue.length < 6)
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

			<div className="chip-area">
				<Chip configs={shortInput}/>
			</div>
		</div>
	);
}

export default Input;
