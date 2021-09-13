/***********************************************************
 * 1. Received an input config by gInput service
 ***********************************************************/

import React, {useEffect, useState} from 'react';
import "./Input.scss"
import Chip from "../../DataExhibitions/Chip/Chip";
import {gChip} from '../../../services/Generators/gChip'


function Input(props) {
	let {labelName, data, type, size, isRequired, isDisable} = props.configs
	let chipMessage = 'Required'
	if (type === 'number') chipMessage = `Should > 0`
	if (type === 'text' || type === 'password') chipMessage = `Too short`
	let [shortInput, setShortInput] = useState(
				gChip(chipMessage, 'error', false)
			),
			randomID = Math.random()


	useEffect(() => {
		let inputRef = document.getElementById(`${labelName}-${randomID}`)

		if (type !== 'file' && inputRef.value !== props.configs.getValue)
			inputRef.value = props.configs.getValue
	}, [props.configs.getValue])


	const updateValue = (event) => {
		let {value: newValue} = event.target,
				{which} = event

		if (type === 'file')
			return validate(event)


		if (props.configs.search && which && which !== 13) // only search keypress event, ignore onchange
			props.configs.search(newValue)

		props.configs.setValue = newValue
	}

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

		toggleAlert(false)
	}

	const toggleAlert = (isDisplay) => {
		setShortInput(
			gChip(chipMessage, 'error', isDisplay)
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
				autoComplete=''
				onBlur={e => validate(e, 'Blur')}
				onChange={e =>  updateValue(e)}
				onKeyUp={e => updateValue(e)}
				list={data.length > 0 ? `${labelName}-${randomID}s` : ''}
			/>

			{
				data.length > 0
					? (
						<datalist id={`${labelName}-${randomID}s`}>
							{
								data.map(i => {
									return <option key={`option-item-${Math.random()}`} value={i}/>
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
