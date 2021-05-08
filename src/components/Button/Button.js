import React from 'react';
import "./Button.scss"

function Button(props) {
	let {name, type, size} = props.configs
	return (
		<button className={`button-container ${type} ${size}`}>
			{name}
		</button>
	);
}

export default Button;