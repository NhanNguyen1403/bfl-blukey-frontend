/***********************************************************
 * 1. Received an input config with generateInput service
 ***********************************************************/

import React, {useState} from 'react';
import "./Input.scss"
import Chip from "../Chip/Chip";
import {generateChip} from '../../services/generateChip'

function Input(props) {
	let {labelName, type, size, isRequired} = props.configs
	let [shortInput, setShortInput] = useState(
		generateChip(`${labelName} too short.`, 'error', false)
	)

	const validate = (newValue) => {
		if (isRequired && newValue.length < 6)
			return toggleAlert(true)

		props.configs.setIsValid = true
		props.configs.setValue = newValue
	}

	const toggleAlert = (isDisplay) => {
		setShortInput(
			generateChip(`${labelName} too short.`, 'error', isDisplay)
		)
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
				<Chip configs={shortInput} closeChip={toggleAlert}/>
			</div>
		</div>
	);
}

export default Input;
