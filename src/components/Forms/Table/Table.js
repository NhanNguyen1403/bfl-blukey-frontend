import React from 'react';

import "./Table.scss"
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";

function Table(props) {
	let data = props.configs

	return (
		<table className='table-container'>
			<TableHeader configs={data}/>
			<hr />
			<TableBody configs={data}/>
		</table>
	);
}

export default Table;