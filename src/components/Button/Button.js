/***********************************************************
 * 1. Received an button config with generateButton service
 * 2. Received an clickHandler function
 ***********************************************************/

import React from 'react';
import "./Button.scss"

function Button(props) {
	let {name, type, size} = props.configs
	return (
		<button onClick={e => props.clickHandler(e)} className={`button-container ${type} ${size}`}>
			{name}
		</button>
	);
}

export default Button;