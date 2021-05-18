/***************************************************
 * 1. Received configs: data to render the table
 * 2. headerItems store headers extracted from data
 ***************************************************/

import React, {useEffect, useState} from 'react';

import "./TableHeader.scss"

function TableHeader(props) {
	let [headerItems, setHeaderItems] = useState([])

	useEffect(() => {
		if (props.configs.length > 0)
			setHeaderItems(Object.keys(props.configs[0]))

	}, [])

	return (
		<thead className='table-header-container'>
			<tr>
				{
					headerItems.map(i => {
						switch (i) {
							case 'createAt': return

							default: {
								return (
									<th key={`table-header-${i}`}>{i}</th>
								)
							}
						}

					})
				}
			</tr>

		</thead>
	);
}

export default TableHeader;