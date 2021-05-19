/***********************************************************
 * 1. Received an input config by generateInput service
 ***********************************************************/

import React, {useState} from 'react';
import "./Input.scss"
import Chip from "../../Forms/Chip/Chip";
import {generateChip} from '../../../services/Generators/generateChip'

function Input(props) {
	let {labelName, data, type, size, isRequired} = props.configs
	let [shortInput, setShortInput] = useState(
		generateChip(`${labelName} too short.`, 'error', false)
	)

	const validate = (newValue) => {
		console.log((newValue))
		if (isRequired && newValue.length < 4)
			return toggleAlert(true)

		props.configs.setIsValid = true
		props.configs.setValue = newValue
		toggleAlert(false)
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
				autoComplete=''
				onBlur={e => validate(e.target.value)}
				list={data.length > 0 ? `${labelName}s` : ''}
			/>

			{
				data.length > 0
					? (
						<datalist id={`${labelName}s`}>
							{
								data.map(i => {
									return <option key={`option-item-${i}`} value={i}/>
								})
							}
						</datalist>
					)
					: null
			}

			<div className="chip-area">
				<Chip configs={shortInput} closeChip={toggleAlert}/>
			</div>
		</div>
	);
}

export default Input;