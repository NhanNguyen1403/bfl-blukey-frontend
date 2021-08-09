import React, {useEffect, useState} from 'react';

import "./TransactionFilter.scss"
import generateInput from "../../../../services/Generators/generateInput";
import Input from "../../../Inputs/Input/Input";
import {generateButton} from "../../../../services/Generators/generateButton";
import Button from "../../../Inputs/Button/Button";
import {showSnack} from "../../../../redux";
import {useDispatch} from "react-redux";
import getAll from "../../../../services/Api/GET/getAll"


function TransactionFilter(props) {
	let dispatch = useDispatch(),
			{filterHandler} = props.clickHandler,
			{transactionId, startDate, endDate, agentName} = props.configs,
			transactionIdInput = generateInput('Transaction ID','number', transactionId, 'sm',false),
			startDateInput = generateInput('Start date','date', startDate,'sm', false),
			endDateInput = generateInput('End date','date', endDate,'sm', false),
			[agentNameInput, setAgentNameInput] = useState(generateInput('Agent name','text', agentName,'sm', false, [], false)),
			[agents, setAgents] = useState([]),
			[status, setStatus] = useState(generateInput('Status', 'text', '', 'sm', false, [])),
			filterButton = generateButton('Filter', 'icon', 'square', 'md', 'filter-icon'),
			awaitSearch = null,
			statuses = {
				New: 1,
				"In Progress": 2,
				Review: 3,
				Complete: 4,
				Error: 5
			}



	useEffect(() => {
		loadAgentNames()
		loadStatuses()
	},[])

	let searchAgent = (agentName) => {
		if (!agentName)
			return

		if (awaitSearch)
			clearTimeout(awaitSearch)
		
		awaitSearch = setTimeout(() => {
			loadAgentNames(agentName)
		}, 2000);
	}

	let loadAgentNames = async (fullName = "") => {
		let params = {
					page: 1,
					limit: 5,
					fullName: fullName,
					fields: "fullName,id"
				},
				{data} = await getAll('users', params),
				agentNames = data.map(agent => agent.fullName),
				{labelName, type, getValue, size, isRequired} = agentNameInput
		
		setAgents(data)
		setAgentNameInput(generateInput(labelName, type, getValue, size, isRequired, agentNames, false, searchAgent))
	}
	let loadStatuses = async () => {
		// load statuses
		let statuses = ['New', 'In Progress', 'Review', 'Complete', 'Error'],
				{labelName, type, value, size, isRequired} = status

		setStatus(generateInput(labelName, type, value, size, isRequired, statuses))
	}
	let validate = () => {
		console.log('Validate filter')
		let agentId = ''

		if (agentNameInput.getValue) {
			let agent = agents.find(agent => agent.fullName === agentNameInput.getValue)
			if (!agent)
				return dispatch(showSnack('Agent invalid', 'danger')) 
			agentId = agent.id
		}

		if ((startDate.isValid && endDate.isValid) && startDate.getValue > endDate.getValue)
			return dispatch(showSnack('Start-date must before/same End date', 'danger'))

		return filterHandler({
			transactionId: transactionIdInput.getValue || '',
			startDate: startDateInput.getValue || '',
			endDate: endDateInput.getValue || '',
			agentId: agentId,
			transactionStatusId: statuses[status.getValue] || ''
		})
	}


	return (
		<div className='transaction-filter-container'>
			<Input configs={transactionIdInput}/>
			<Input configs={startDateInput}/>
			<Input configs={endDateInput}/>
			<Input configs={agentNameInput}/>
			<Input configs={status}/>

			<div className="button-area">
				<Button configs={filterButton} clickHandler={validate}/>
			</div>
		</div>
	);
}

export default TransactionFilter;
