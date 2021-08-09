/****************************
* 1. Props will display
* 2. State will close
* 3. Received configs
* 4. Received Hide function
*****************************/

import React from 'react';
import "./Chip.scss"

function Chip(props) {
	let {name, type} = props.configs

	return (
		<div className={`chip-container ${type} ${props.configs.getIsActive ? 'active' : 'inactive'}`}>
			{name}
			<span onClick={() => props.closeChip(false)} > X </span>
		</div>
	);
}

export default Chip;
