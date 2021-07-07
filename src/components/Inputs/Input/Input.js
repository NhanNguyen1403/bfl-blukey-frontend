/***********************************************************
 * 1. Received an input config by generateInput service
 ***********************************************************/

import React, {useState} from 'react';
import "./Input.scss"
import Chip from "../../DataExhibitions/Chip/Chip";
import {generateChip} from '../../../services/Generators/generateChip'

function Input(props) {
	let {labelName, data, type, size, isRequired, isDisable} = props.configs
	let chipMessage = 'Required'
	if (type === 'number') chipMessage = `Should > 0`
	if (type === 'text' || type === 'password') chipMessage = `Too short`
	let [shortInput, setShortInput] = useState(
		generateChip(chipMessage, 'error', false)
	)

	const validate = (event) => {
		let {value: newValue, files} = event.target

		if (isRequired && type === 'number' && newValue <= 0)
			return toggleAlert(true)

		if (isRequired && type !== 'number' && newValue.length < 3)
			return toggleAlert(true)

		if (data.length > 0 && !data.includes(newValue))
			return props.configs.setIsValid = false

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
			generateChip(chipMessage, 'error', isDisplay)
		)
	}


	return (
		<div className={`input-container ${size} ${isDisable ? 'disabled' : ''}`}>
			<label className={type} htmlFor={`${labelName}`}>
				{labelName}

				<span>
          {isRequired ? ' *' : ''}
        </span>
			</label>

			<input
				disabled={isDisable}
				id={labelName}
				placeholder={labelName}
				type={type}
				defaultValue={props.configs.getValue}
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
