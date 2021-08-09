/****************************************************************
 * 1. Received configs: currentPage, totalItems
 * 2. Handler: next, back, changeDirectPage
 * 3. pageItems as a State to Rerender every time "current" change
 *****************************************************************/

import React, {useEffect, useState} from 'react';

import {IconContext} from "react-icons";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import "./Paging.scss"

function Paging(props) {
	let {current, itemPerPage, totalItem} = props.configs
	let {next, back, changeDirectPage} = props.clickHandler
	let [pageItems, setPageItems] = useState([])


	useEffect(() => {
		let numOfPages = ((totalItem - 1) / itemPerPage) + 1
		let temp = []

		for (let i = 1; i <= numOfPages; i++) {
			temp.push(i)
		}
		setPageItems(temp)
	}, [current, totalItem])

	let itemRange = () => {
		let leftRange = itemPerPage * (current - 1) + 1,
				rightRange = itemPerPage * current

		return `${leftRange}-${rightRange} of ${totalItem}`
	}

	return (
		<div className='paging-container'>
			<span className='summarize'>{itemRange()}</span>
			<IconContext.Provider value={{size: '25px', className: "icon"}}>
				<IoIosArrowDropleftCircle className='page-button' onClick={back}/>
				{
					pageItems.map(i => {
						if (i === current)
							return <span onClick={() => changeDirectPage(i)} className='page-item active' key={`page-item-${i}`}>{i}</span>
						return <span onClick={() => changeDirectPage(i)} className='page-item' key={`page-item-${i}`}>{i}</span>
					})
				}
				<IoIosArrowDroprightCircle className='page-button' onClick={next}/>
			</IconContext.Provider>
		</div>
	);
}

export default Paging;
