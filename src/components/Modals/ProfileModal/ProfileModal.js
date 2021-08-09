import React, {useEffect, useState} from 'react';

import "./ProfileModal.scss"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import PageOption from "../../Inputs/pageOption/pageOption";
import {generatePageOption} from "../../../services/Generators/generatePageOption";
import {hideProfileModal} from "../../../redux";
import {needReload} from "../../../redux";
import ChangeProfileForm from "../../Forms/changeProfileForm/changeProfileForm";
import DocumentForm from "../../Forms/DocumentForm/DocumentForm";
import ChangePasswordForm from "../../Forms/changePasswordForm/changePasswordForm";
import Put from "../../../services/Api/PUT/put"
import getUnit from "../../../services/Api/GET/getUnit";

function ProfileModal(props) {
	let dispatch = useDispatch()
	let {isDisplay, mode, user} = useSelector(state => {
		return state.profileModal
	})
	let [optionList, setOptionList] = useState([])
	useEffect(() => {
		// if (mode === 'edit')
		// 	return setOptionList(prevState => [
		// 			generatePageOption('Profile', 'md', true),
		// 			generatePageOption('Documents', 'md', false),
		// 			generatePageOption('Password', 'md', false),
		// 		]
		// 	)
		setOptionList([
			generatePageOption('Profile', 'md', true),
			generatePageOption('Documents', 'md', false),
		])
	}, [mode])
	let closeButton = generateButton('close', 'icon', 'solid', 'md', 'close-icon')

	let closeModal = () => {
		dispatch(hideProfileModal())
	}
	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return generatePageOption(i.name, i.size, i.name === optionName)
		}))
	}

	let saveProfile = async (id, payload) => {
		await Put('users', id, payload)
		let {data: getInfoResult} = await getUnit('users', id)
		localStorage.setItem('user', JSON.stringify(getInfoResult))
		closeModal()
		dispatch(needReload())
	}

	const savePassword = async (id, payload) => {
		await Put('users', id, payload)
		closeModal()
	}


	return (
		isDisplay && <div className="profile-modal-container">
			<div className="modal-content">
				<div className="options-area">
					{
						optionList.map(i => {
							return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changeOption}/>)
						})
					}
					<div className="button-area">
						<Button configs={closeButton} clickHandler={closeModal}/>
					</div>
				</div>

				{
					optionList[0].isActive &&
					<ChangeProfileForm configs={{mode, user}} clickHandler={{save: saveProfile, cancel: closeModal}}/>
				}
				{optionList[1].isActive && <DocumentForm configs={{mode, user}}/>}
				{/*{*/}
				{/*	mode === 'edit' &&*/}
				{/*	optionList[2]?.isActive &&*/}
				{/*	<ChangePasswordForm configs={user} clickHandler={{save: savePassword, cancel: closeModal}}/>*/}
				{/*}*/}
			</div>

			<div className="blur"/>
		</div>
	);
}

export default ProfileModal;
