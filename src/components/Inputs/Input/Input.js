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

	const validate = (event) => {
		let {value: newValue, files} = event.target
		console.log(labelName, newValue)

		if (isRequired && newValue.length < 4)
			return toggleAlert(true)

		if (data && data.includes(newValue))
			return

		props.configs.setIsValid = true
		if (type === 'file') {
			props.configs.setValue = files[0]
			props.fileHandler()
			toggleAlert(false)
			return
		}

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
				defaultValue={defaultValue}
				autoComplete=''
				onBlur={e => {if (type !== 'file') validate(e)}}
				onChange={e => {if (type === 'file') validate(e)}}
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
