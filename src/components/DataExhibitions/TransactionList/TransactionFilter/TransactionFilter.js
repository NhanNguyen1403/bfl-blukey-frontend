import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { showSnack } from "../../../../redux";
import getAll from "../../../../services/Api/GET/getAll";
import { gButton } from "../../../../services/Generators/gButton";
import gInput from "../../../../services/Generators/gInput";
import gSelect from "../../../../services/Generators/gSelect";
import gSubTab from '../../../../services/Generators/gSubTab';
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import Select from "../../../Inputs/Select/Select";
import SubTab from '../../../Inputs/SubTab/SubTab';
import "./TransactionFilter.scss";



function TransactionFilter(props) {
	let dispatch = useDispatch(),
			{isAdmin, fullName, id: loggingUserId} = JSON.parse(localStorage.getItem('user')) || false,
			{filterHandler} = props.clickHandler,
			{transactionId, startDate, endDate, agentName, transactionStatusId, seller, buyer, address} = props.configs,
			transactionIdInput = gInput('Search transaction with ID', 'text-area',transactionId, 'full',false),
			startDateInput = gInput('Start date','date', startDate,'sm', false),
			endDateInput = gInput('End date','date', endDate,'sm', false),
			[agentNameInput, setAgentNameInput] = useState(gInput('Agent name','text', !isAdmin ? fullName : agentName,'sm', false, [], !isAdmin)),
			[sellerInput, setSellerInput] = useState(gInput('Seller','text', seller,'sm', false, [], false)),
			[buyerInput, setBuyerInput] = useState(gInput('Buyer','text', buyer,'sm', false, [], false)),
			[agents, setAgents] = useState([]),
			[sellers, setSellers] = useState([]),
			[buyers, setBuyers] = useState([]),
			addressInput = gInput('Address','text', address, 'full font-sm',false),
			searchButton = gButton('Search', 'icon', 'square non-bg', 'md', 'search-icon'),
			filterButton = gButton('Filter', 'icon', 'square non-bg', 'md', 'filter-icon'),
			awaitSearchAgent = null,
			awaitSearchSeller = null,
			awaitSearchBuyer = null,
			[currentTabFilter, setCurrentTabFilter] = useState('Listing'),
			[displayAdvanceFilter, setDisplayAdvanceFilter] = useState(false),
			advanceFilterRef = useRef(),
			appleButton = gButton(`Apply`, 'text', 'solid', 'md'),
			resetButton = gButton('Reset', 'text', 'outlined', 'md'),
			statusSelect = gSelect('Status', transactionStatusId, 'font__md width__half', [
				{value: '', displayName: 'All'},
				{value: 1, displayName: 'New'},
				{value: 2, displayName: 'In Progress'},
				{value: 3, displayName: 'Review'},
				{value: 4, displayName: 'Complete'},
				{value: 5, displayName: 'Error'},
			], false),
			[subTabConfig, setSubTabConfig] = useState(gSubTab(
        ['Listing', 'Buying'],
        'Listing',
				'w-half'
      ))



	useEffect(() => {
		loadSellerNames('', true)
		loadBuyerNames('', true)

		if (isAdmin)
			loadAgentNames()
	},[])

	useEffect(() => {
		validate()
	}, [currentTabFilter])

	useEffect(() => {
		displayAdvanceFilter
			? document.addEventListener('mousedown', clickOutsideHandler)
			: document.removeEventListener('mousedown', clickOutsideHandler)

		return () => {
			document.removeEventListener('mousedown', clickOutsideHandler);
		};
	}, [displayAdvanceFilter])




	let clickOutsideHandler = (e) => {
		if (!advanceFilterRef.current || !advanceFilterRef.current.contains(e.target)) {
			setDisplayAdvanceFilter(false);
		}
	}

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
		setAgentNameInput(gInput(labelName, type, fullName, size, isRequired, agentNames, false, searchAgent))
	}

	let loadSellerNames = async (searchingName = "", loadDefault = false) => {
		if (loadDefault){
			let {labelName, type, size, isRequired} = sellerInput
			return setSellerInput(gInput(labelName, type, '', size, isRequired, [], false, searchSeller))
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
		setSellerInput(gInput(labelName, type, searchingName, size, isRequired, sellerNames, false, searchSeller))
	}

	let loadBuyerNames = async (searchingName = "", loadDefault = false) => {
		if (loadDefault) {
			let {labelName, type, size, isRequired} = buyerInput
			return setBuyerInput(gInput(labelName, type, '', size, isRequired, [], false, searchBuyer))
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
		setBuyerInput(gInput(labelName, type, searchingName, size, isRequired, buyerNames, false, searchBuyer))
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
			if (!isAdmin) 
				agentId = loggingUserId
			else {
				let agent = agents.find(a => a.fullName === agentNameInput.getValue)
				if (!agent) 
					return dispatch(showSnack('Agent invalid', 'danger'))
				agentId = agent.id 
			}
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
			transactionStatusId: statusSelect.value || '',
			agentId,
			buyerName,
			sellerName,
			address: addressInput.getValue || '',
		})

		setDisplayAdvanceFilter(false)
	}

	let changeSubTab = (newTab) => {
    let {tabs, styles} = subTabConfig
    setSubTabConfig(gSubTab(tabs, newTab, styles))

		if (newTab !== currentTabFilter){
			setCurrentTabFilter(newTab)
		}
  }


	return (
		<div className='transaction-filter-container'>
			<SubTab configs={subTabConfig} handlers={{changeSubTab}}/>

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
					displayAdvanceFilter && <div ref={advanceFilterRef} className="advance-filter-area">
						<div className="filters">
							<p className="title">FILTER</p>
							<Input configs={startDateInput}/>
							<Input configs={endDateInput}/>
							<Input configs={sellerInput}/>
							<Input configs={buyerInput}/>
							<Input configs={agentNameInput}/>
							<Select configs={statusSelect} />
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
