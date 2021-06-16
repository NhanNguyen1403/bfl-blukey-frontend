import React from 'react';

import "./pageOption.scss"

function PageOption(props) {
	let {name, size, isActive} = props.configs
	return (
		<div
			className={`page-option-container ${size} ${isActive ? 'active' : ''}`}
			onClick={() => props.clickHandler(name)}>
			{name}
		</div>
	);
}

export default PageOption;