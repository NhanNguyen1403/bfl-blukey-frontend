import React, {useState} from 'react';

import "./Administer.scss"

import {useDispatch} from "react-redux";
import {changeTab as changeGlobalTab}  from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import PageOption from "../../components/pageOption/pageOption";
import Button from "../../components/Button/Button";


function Administer(props) {
	let dispatch = useDispatch()
	let [optionList, setOptionList] = useState([
		generatePageOption('Users', 'lg', true),
		generatePageOption('Create', 'lg', false),
	])
	let closeButton = generateButton('close', 'default', 'lg', 'close-icon')

	let redirectHome = () => {
		dispatch(changeGlobalTab('Home'))
	}
	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.name, i.size, i.name === optionName)
		}))
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
		</div>
	);
}

export default Administer;