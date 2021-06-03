/****************************************************
 * 1. Received configs: data to render the table
 * 2. Using switch-case for special columns
 *****************************************************/

import React from 'react';
import {useDispatch} from "react-redux";
import {showProfileModal} from "../../../../redux";

import {IconContext} from "react-icons";
import {FaCheckCircle} from "react-icons/fa";

import "./TableBody.scss"

function TableBody(props) {
	let dispatch = useDispatch()

	let viewUserDetail = (userInfo) => {
		// check User's role
		let {is_admin} = JSON.parse(localStorage.getItem('user'))
		is_admin === true
			? dispatch(showProfileModal('edit', userInfo))
			: dispatch(showProfileModal('view', userInfo))

	}

	return (
		<tbody className='table-body-container'>
		<IconContext.Provider value={{size: '20px', className: "icon"}}>
			{
				props.configs.map(item => {
					return (
						<tr onClick={() => viewUserDetail(item)} key={`table-row-${item.id}`}>
							{
								Object.keys(item).map(key => {
									switch (key) {
										case 'is_admin': {
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