import React from 'react';

import "./Loader.scss"

function Loader({isLogging}) {
	return (
		<div className={`loader-container ${isLogging ? 'logging' : ''} `}>
			<div className="loader">
				<div className="dot1"/>
				<div className="dot2"/>
				<div className="dot3"/>
			</div>

			<div className="blur"/>
		</div>
	);
}

export default Loader;
