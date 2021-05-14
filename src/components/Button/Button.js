/***********************************************************
 * 1. Received an button config with generateButton service
 * 2. Received an clickHandler function
 ***********************************************************/

import React from 'react';
import "./Button.scss"

import {IconContext} from "react-icons";
import {IoClose} from "react-icons/io5"

function Button(props) {
	let {name, type, size, icon} = props.configs
	let iconSize = size === 'lg' ? '30px' : '24px'


	return (
		<IconContext.Provider value={{size: iconSize, className: "icon"}}>
			<button onClick={e => props.clickHandler(e)} className={`button-container ${type} ${size}`}>
				{icon === 'close-icon' ? <IoClose/> : name}
			</button>
		</IconContext.Provider>
	);
}

export default Button;