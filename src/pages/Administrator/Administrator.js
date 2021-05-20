/****************************************************
 * 1. Setup configs for PageOptions
 * 		Change pageOptions: Administrator, Create
 * 2. Setup configs for Table
 * 		Load init data for Table
 * 		Get new Data every time change currentPage
 * 3. Setup configs for CreatUser Modal
 * 		Call Api to CreateUser
 *****************************************************/

import React, {useEffect, useState} from 'react';

import "./Administrator.scss"

import {useDispatch} from "react-redux";
import {changeTab as changeGlobalTab}  from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
// import {getAll} from "../../services/Api/getAll.js"

import PageOption from "../../components/Forms/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import Table from "../../components/Forms/Table/Table";
import CreateUserForm from "../../components/Forms/CreateUserForm/CreateUserForm";

function Administrator() {
	let dispatch = useDispatch()
	let [currentPage, setCurrentPage] = useState(1)
	let [optionList, setOptionList] = useState([
		generatePageOption('Users', 'lg', true),
		generatePageOption('Create', 'lg', false),
	])
	let closeButton = generateButton('close', 'icon', 'solid', 'lg', 'close-icon')

	let redirectHome = () => {
		dispatch(changeGlobalTab('Home'))
	}
	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.name, i.size, i.name === optionName)
		}))
	}
	useEffect(() => {
		// Call getAll API to get data
	}, [currentPage])

	let fakeUsers = [
		{id: 1,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 1},
		{id: 2,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 2},
		{id: 3,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 3},
		{id: 4,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 4},
		{id: 5,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 5},
		{id: 6,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 6},
		{id: 7,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 7},
		{id: 8,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 8},
		{id: 9,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 9},
		{id: 10,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 10},
		{id: 11,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 11},
		{id: 12,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 12},
		{id: 13,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 13},
		{id: 14,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 14},
		{id: 15,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 15},
		{id: 16,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 16},
	]
	let pageConfigs = {current: currentPage, totalItem: 26}
	let changeDirectPage = (page) => {
		setCurrentPage(page)
	}
	let next = () => {
		if (currentPage < (pageConfigs.totalItem / 25))
			setCurrentPage(prevState => prevState + 1)
	}
	let back = () => {
		if (currentPage > 1)
			setCurrentPage(prevState => prevState - 1)
	}

	let create = (payload) => {
		console.log('Create with:', payload)
	}


	return (
		<div className='administrator-container'>
			<div className="options-area">
				{
					optionList.map(i => {
						return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changeOption}/>)
					})
				}
				<div className="button-area">
					<Button configs={closeButton} clickHandler={redirectHome}/>
				</div>
			</div>

			<div className="content-area">
				{
					optionList[1].isActive
					? <CreateUserForm clickHandler={{create, cancel: changeOption}}/>
					: (
						<div className="table-area">
							<Table configs={{fakeUsers, pageConfigs}} clickHandler={{next, back, changeDirectPage}}/>
						</div>
					)
				}
			</div>
		</div>
	);
}

export default Administrator;
