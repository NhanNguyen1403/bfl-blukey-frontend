/****************************************************
 * 1. Received configs: data to render the table
 * 2. Using switch-case for special columns
 *****************************************************/

import React from 'react';

import {IconContext} from "react-icons";
import {FaCheckCircle} from "react-icons/fa";

import "./TableBody.scss"

function TableBody(props) {
	return (
		<tbody className='table-body-container'>
		<IconContext.Provider value={{size: '20px', className: "icon"}}>
			{
				props.configs.map(item => {
					return (
						<tr key={`table-row-${item.id}`}>
							{
								Object.keys(item).map(key => {
									switch (key) {
										case 'isAdmin': {
											return <td key={`row-item-${item.id}-${key}`}>{item[key] ? <FaCheckCircle/> : ''}</td>
										}

										case 'createAt':
											return

										default: {
											return (
												<td key={`row-item-${item.id}-${key}`}>{item[key]}</td>
											)
										}
									}
								})
							}
						</tr>
					)
				})
			}
		</IconContext.Provider>
		</tbody>
	)

}

export default TableBody;