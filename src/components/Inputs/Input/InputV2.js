import React, { useState } from 'react'

import "./InputV2.scss"
import { gChip } from '../../../services/Generators/gChip'
import Chip from '../../DataExhibitions/Chip/Chip'

const InputV2 = React.forwardRef((props, ref) => {
	let {labelName, type, styles, isRequired, isDisable} = props,
			chipMessage = 'Required'

	if (type === 'number') chipMessage = `Should > 0`
	if (type === 'text' || type === 'password') chipMessage = `Too short`
	let [shortInput, setShortInput] = useState(
				gChip(chipMessage, 'error', false)
			),
	randomID = Math.random()

	const toggleAlert = (isDisplay) => {
		setShortInput(
			gChip(chipMessage, 'error', isDisplay)
		)
	}

	let validate = () => {
		if (isRequired && ref.current.value.length < 3)
			return toggleAlert(true)
		toggleAlert(false)
	}

	return (
		<div className={`input-v2 ${styles}`}>
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
				onBlur={validate}
				ref={ref}
			/>

			<div className="chip-area">
				<Chip configs={shortInput} closeChip={toggleAlert}/>
			</div>
		</div>
	)
})

export default InputV2
