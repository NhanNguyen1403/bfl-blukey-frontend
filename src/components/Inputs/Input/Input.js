/***********************************************************
 * 1. Received an input config by generateInput service
 ***********************************************************/

import React, {useEffect, useState} from 'react';
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
			),
			randomID = Math.random(),
			[value, setValue] = useState(props.configs.getValue)


	useEffect(() => {
		setValue(props.configs.getValue)
	}, [props.configs.getValue]);


	const validate = (event) => {
		let {value: newValue, files} = event.target

		if (isRequired && type === 'number' && newValue <= 0)
			return toggleAlert(true)

		if (isRequired && type !== 'number' && newValue.length < 2)
			return toggleAlert(true)

		if (data.length > 0 && newValue.length !== 0 && !data.includes(newValue))
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

	let keyPressEvent = (event) => {
		let newValue = event.target.value,
				which = event.which
		
		// ignore left click and enter key
		if (which && which !== 13) {
			props.configs.setValue = newValue
			props.configs.keyPress(newValue)
		}
	}

	const toggleAlert = (isDisplay) => {
		setShortInput(
			generateChip(chipMessage, 'error', isDisplay)
		)
	}


	return (
		<div className={`input-container ${size} ${isDisable ? 'disabled' : ''}`}>
			<label className={type} htmlFor={`${labelName}-${randomID}`}>
				{labelName}

				<span>
          {isRequired ? ' *' : ''}
        </span>
			</label>

			<input
				disabled={isDisable}
				id={`${labelName}-${randomID}`}
				placeholder={labelName}
				type={type}
				defaultValue={value}
				autoComplete=''
				onBlur={e => {if (type !== 'file') validate(e)}}
				onChange={e => {if (type === 'file') validate(e)}}
				onKeyUp={e => keyPressEvent(e)}
				list={data.length > 0 ? `${labelName}-${randomID}s` : ''}
			/>

			{
				data.length > 0
					? (
						<datalist id={`${labelName}-${randomID}s`}>
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
