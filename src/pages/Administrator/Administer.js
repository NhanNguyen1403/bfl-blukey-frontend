import React, {useState} from 'react';

import "./Administer.scss"

import {useDispatch} from "react-redux";
import {changeTab as changeGlobalTab}  from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import PageOption from "../../components/Forms/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import Table from "../../components/Forms/Table/Table";


function Administer(props) {
	let dispatch = useDispatch()
	let [optionList, setOptionList] = useState([
		generatePageOption('Users', 'lg', true),
		generatePageOption('Create', 'lg', false),
	])
	let closeButton = generateButton('close', 'default', 'icon', 'close-icon')

	let redirectHome = () => {
		dispatch(changeGlobalTab('Home'))
	}
	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.name, i.size, i.name === optionName)
		}))
	}
	let fakeUsers = [
		{id: 1,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 1},
		{id: 2,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 2},
		{id: 3,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 3},
		{id: 4,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 4},
		{id: 5,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 5},
		{id: 6,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 6},
		{id: 7,lastName: 'Nguyen', firstName: 'Nhan', email: 'nqnhan1403@gmail.com', address: '10 Vo Van Kiet', userName: 'nhannguyen', isAdmin: true, createAt: 7},
	]

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

			<div className="table-area">
				<Table configs={fakeUsers} />
			</div>
		</div>
	);
}

export default Administer;