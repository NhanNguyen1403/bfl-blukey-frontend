import React, {useEffect, useState} from 'react';

import "./ProfileModal.scss"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../Inputs/Button/Button";
import PageOption from "../../Inputs/pageOption/pageOption";
import {hideProfileModal} from "../../../redux";
import {needReload} from "../../../redux";
import ChangeProfileForm from "../../Forms/changeProfileForm/changeProfileForm";
import DocumentForm from "../../Forms/DocumentForm/DocumentForm";
import ChangePasswordForm from "../../Forms/changePasswordForm/changePasswordForm";
import Put from "../../../services/Api/PUT/put"
import getUnit from "../../../services/Api/GET/getUnit";
import {gButton} from "../../../services/Generators/gButton";
import {gPageOption} from "../../../services/Generators/gPageOption";

function ProfileModal(props) {
	let dispatch = useDispatch(),
			{isDisplay, mode, user} = useSelector(state => {
				return state.profileModal
			}),
			[optionList, setOptionList] = useState([
				gPageOption(undefined,'Profile', 'md', true),
				gPageOption(undefined,'Documents', 'md', false),
			]),
			closeButton = gButton('close', 'icon', 'solid', 'md', 'close-icon')


	let closeModal = () => {
		dispatch(hideProfileModal())
		setOptionList([
			gPageOption(undefined,'Profile', 'md', true),
			gPageOption(undefined,'Documents', 'md', false),
		])
	}
	let changeOption = (optionName) => {
		setOptionList(optionList.map(i => {
			return gPageOption(i.path, i.name, i.size, i.name === optionName)
		}))
	}
	let saveProfile = async (id, payload) => {
		await Put('users', id, payload)

		if (isLoggingUser(id)) {
			let {data: getInfoResult} = await getUnit('users', id)
			localStorage.setItem('user', JSON.stringify(getInfoResult))
		}

		dispatch(needReload())
		closeModal()
	}
	let savePassword = async (id, payload) => {
		await Put('users', id, payload)
		closeModal()
	}
	let isLoggingUser = (id) => {
		let {id: loggingUserId} = JSON.parse(localStorage.getItem('user'))
		return loggingUserId === id
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
