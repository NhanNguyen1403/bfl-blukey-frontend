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
			{isAdmin, fullName} = JSON.parse(localStorage.getItem('user')) || false,
			{filterHandler} = props.clickHandler,
			{transactionId, startDate, endDate, agentName, seller, buyer, address} = props.configs,
			transactionIdInput = generateInput('Search transaction with ID', 'text-area',transactionId, 'full',false),
			startDateInput = generateInput('Start date','date', startDate,'sm', false),
			endDateInput = generateInput('End date','date', endDate,'sm', false),
			[status, setStatus] = useState(generateInput('Status', 'text', '', 'sm', false, [])),
			[agentNameInput, setAgentNameInput] = useState(generateInput('Agent name','text', !isAdmin ? fullName : agentName,'sm', false, [], !isAdmin)),
			[sellerInput, setSellerInput] = useState(generateInput('Seller','text', seller,'sm', false, [], false)),
			[buyerInput, setBuyerInput] = useState(generateInput('Buyer','text', buyer,'sm', false, [], false)),
			[agents, setAgents] = useState([]),
			[sellers, setSellers] = useState([]),
			[buyers, setBuyers] = useState([]),
			addressInput = generateInput('Address','text', address, 'full font-sm',false),
			searchButton = generateButton('Search', 'icon', 'square non-bg', 'md', 'search-icon'),
			filterButton = generateButton('Filter', 'icon', 'square non-bg', 'md', 'filter-icon'),
			awaitSearchAgent = null,
			awaitSearchSeller = null,
			awaitSearchBuyer = null,
			[currentTabFilter, setCurrentTabFilter] = useState('Listing'),
			[displayAdvanceFilter, setDisplayAdvanceFilter] = useState(false),
			appleButton = generateButton(`Apply`, 'text', 'solid', 'md'),
			resetButton = generateButton('Reset', 'text', 'outlined', 'md'),
			statuses = {
				New: 1,
				"In Progress": 2,
				Review: 3,
				Complete: 4,
				Error: 5
			}



	useEffect(() => {
		loadStatuses() // In case load status from Server
		loadSellerNames('', true)
		loadBuyerNames('', true)

		if (isAdmin)
			loadAgentNames()
	},[])
	useEffect(() => {
		validate()
	}, [currentTabFilter])

	let searchAgent = (agentName) => {
		if (!agentName)
			return

		if (awaitSearchAgent)
			clearTimeout(awaitSearchAgent)

		awaitSearchAgent = setTimeout(() => {
			loadAgentNames(agentName)
		}, 2000);
	}
	let searchSeller = (sellerName) => {
		if (!sellerName)
			return

		if (awaitSearchSeller)
			clearTimeout(awaitSearchSeller)

		awaitSearchSeller = setTimeout(() => {
			loadSellerNames(sellerName)
		}, 2000);
	}
	let searchBuyer = (buyerName) => {
		if (!buyerName)
			return

		if (awaitSearchBuyer)
			clearTimeout(awaitSearchBuyer)

		awaitSearchBuyer = setTimeout(() => {
			loadBuyerNames(buyerName)
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
				{labelName, type, size, isRequired} = agentNameInput

		setAgents(data)
		setAgentNameInput(generateInput(labelName, type, fullName, size, isRequired, agentNames, false, searchAgent))
	}
	let loadSellerNames = async (searchingName = "", loadDefault = false) => {
		if (loadDefault){
			let {labelName, type, size, isRequired} = sellerInput
			return setSellerInput(generateInput(labelName, type, '', size, isRequired, [], false, searchSeller))
		}

		let params = {
					page: 1,
					limit: 5,
					sellerName: searchingName,
				},
				{data} = await getAll('transactions/search/suggest', params),
				sellerNames = data.map(seller => seller.sellerName),
				{labelName, type, size, isRequired} = sellerInput

		setSellers(data)
		setSellerInput(generateInput(labelName, type, searchingName, size, isRequired, sellerNames, false, searchSeller))
	}
	let loadBuyerNames = async (searchingName = "", loadDefault = false) => {
		if (loadDefault) {
			let {labelName, type, size, isRequired} = buyerInput
			return setBuyerInput(generateInput(labelName, type, '', size, isRequired, [], false, searchBuyer))
		}

		let params = {
					page: 1,
					limit: 5,
					buyerName: searchingName,
				},
				{data} = await getAll('transactions/search/suggest', params),
				buyerNames = data.map(buyer => buyer.buyerName),
				{labelName, type, size, isRequired} = buyerInput

		setBuyers(data)
		setBuyerInput(generateInput(labelName, type, searchingName, size, isRequired, buyerNames, false, searchBuyer))
	}
	let loadStatuses = async () => {
		// load statuses
		let statuses = ['New', 'In Progress', 'Review', 'Complete', 'Error'],
				{labelName, type, value, size, isRequired} = status

		setStatus(generateInput(labelName, type, value, size, isRequired, statuses))
	}
	let changeTabFilter = (tab) => {
		if (tab !== currentTabFilter){
			setCurrentTabFilter(tab)
		}
	}
	let resetFilter = () => {
		filterHandler({
			transactionId: '',
			isListing: currentTabFilter === 'Listing',
			startDate: '',
			endDate: '',
			transactionStatusId: '',
			agentId: null,
			buyerName: '',
			sellerName: '',
			address: '',
		})
		setDisplayAdvanceFilter(false)
	}

	let validate = () => {
		console.log('Validate filter')
		let agentId = '',
				sellerName = '',
				buyerName = ''

		if (agentNameInput.getValue) {
			let agent = agents.find(a => a.fullName === agentNameInput.getValue)
			if (!agent)
				return dispatch(showSnack('Agent invalid', 'danger'))
			agentId = agent.id
		}
		if (sellerInput.getValue) {
			let seller = sellers.find(s => s.sellerName === sellerInput.getValue)
			if (!seller)
				return dispatch(showSnack('Seller name invalid', 'danger'))
			sellerName = seller.sellerName
		}

		if (buyerInput.getValue) {
			let buyer = buyers.find(b => b.buyerName === buyerInput.getValue)
			if (!buyer)
				return dispatch(showSnack('Buyer name invalid', 'danger'))
			buyerName = buyer.buyerName
		}

		if ((startDate.isValid && endDate.isValid) && startDate.getValue > endDate.getValue)
			return dispatch(showSnack('Start-date must before/same End date', 'danger'))

		filterHandler({
			transactionId: transactionIdInput.getValue || '',
			isListing: currentTabFilter === 'Listing',
			startDate: startDateInput.getValue || '',
			endDate: endDateInput.getValue || '',
			transactionStatusId: statuses[status.getValue] || '',
			agentId,
			buyerName,
			sellerName,
			address: addressInput.getValue || '',
		})

		setDisplayAdvanceFilter(false)
	}


	return (
		<div className='transaction-filter-container'>

			<div className="tab-filter-area">
				{
					['Listing', 'Buying'].map(tab => {
						return (
							<div
								key={tab}
								className={`tab-item ${tab === currentTabFilter ? 'active' : ''}`}
								onClick={() => changeTabFilter(tab)}>
								{tab}
							</div>
						)
					})
				}
			</div>

			<div className="search-area">
				<div className="button-area">
					<Button configs={searchButton} clickHandler={validate}/>
				</div>

				<div className="search">
					<Input configs={transactionIdInput}/>
				</div>

				<div className="button-area">
					<Button configs={filterButton} clickHandler={() => setDisplayAdvanceFilter(!displayAdvanceFilter)}/>
				</div>

				{
					displayAdvanceFilter && <div className="advance-filter-area">
						<div className="filters">
							<p className="title">FILTER</p>
							<Input configs={startDateInput}/>
							<Input configs={endDateInput}/>
							<Input configs={sellerInput}/>
							<Input configs={buyerInput}/>
							<Input configs={agentNameInput}/>
							<Input configs={status}/>
							<Input configs={addressInput}/>
						</div>

						<div className="button-area">
							<Button configs={resetButton} clickHandler={() => resetFilter()}/>
							<Button configs={appleButton} clickHandler={validate}/>
						</div>
					</div>
				}

			</div>







			{/*<div className="input-area">*/}
			{/*	<Input configs={transactionIdInput}/>*/}
			{/*	<Input configs={startDateInput}/>*/}
			{/*	<Input configs={endDateInput}/>*/}
			{/*	<Input configs={status}/>*/}
			{/*	<Input configs={agentNameInput}/>*/}
			{/*	<Input configs={sellerInput}/>*/}
			{/*	<Input configs={buyerInput}/>*/}
			{/*	<Input configs={addressInput}/>*/}
			{/*</div>*/}

			{/*<div className="button-area">*/}
			{/*	<Button configs={filterButton} clickHandler={validate}/>*/}
			{/*</div>*/}
		</div>
	);
}

export default TransactionFilter;
