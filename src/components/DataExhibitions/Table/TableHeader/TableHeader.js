/***************************************************
 * 1. Received configs: data to render the table
 * 2. headerItems store headers extracted from data
 ***************************************************/

import React, {useEffect, useState} from 'react';

import "./TableHeader.scss"

function TableHeader(props) {
	let [headerItems, setHeaderItems] = useState([])

	useEffect(() => {
		if (props.configs.length > 0){
			let rawHeaders = Object.keys(props.configs[0])
			setHeaderItems(rawHeaders.map(i => i.replace('_', ' ')))
		}



	}, [props.configs])

	return (
		<thead className='table-header-container'>
			<tr>
				{
					headerItems.map(i => {
						switch (i) {
							case 'createAt': return

							case 'firstName': return <th key={`table-header-${i}`}>First Name</th>

							case 'lastName': return <th key={`table-header-${i}`}>Last Name</th>

							case 'lastLoginDate': return <th key={`table-header-${i}`}>Last Login</th>

							case 'isRequired': return <th key={`table-header-${i}`}>Required</th>

							case 'isListing': return <th key={`table-header-${i}`}>Listing</th>

							case 'isBoth': return <th key={`table-header-${i}`}>Both</th>

							case 'updatedAt': return

							case 'isAdmin': return <th key={`table-header-${i}`}>Admin</th>

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
