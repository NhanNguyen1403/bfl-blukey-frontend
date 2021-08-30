import React from 'react';

import "./pageOption.scss"
import {Link, useRouteMatch} from "react-router-dom";

function PageOption(props) {
	let {path, name, size, isActive} = props.configs
	const {url} = useRouteMatch()


	if (path === undefined)
		return (
			<div
				className={`page-option-container ${size} ${isActive ? 'active' : ''}`}
				onClick={() => props.clickHandler(name)}>
				{name}
			</div>
		)


	return (
		<Link to={`${url}${path}`}>
			<div
				className={`page-option-container ${size} ${isActive ? 'active' : ''}`}
				onClick={() => props.clickHandler(name)}>
				{name}
			</div>
		</Link>
	);
}

export default PageOption;
