import React, {useEffect} from 'react';

import "./changeProfileForm.scss"
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";
import gSelect from "../../../services/Generators/gSelect";
import Select from "../../Inputs/Select/Select";

function ChangeProfileForm(props) {
	let {save, cancel} = props.clickHandler
	let {mode, user} = props.configs

	let isOwnerAdmin = () => {
		let {isAdmin} = JSON.parse(localStorage.getItem('user'))
		return isAdmin === true
	}

	let firstName = gInput('First name', 'text', user.firstName, 'half'),
		lastName = gInput('Last name', 'text', user.lastName, 'half'),
		email = gInput('Email', 'text', user.email, 'half'),
		role = gSelect('Role', user.isAdmin, 'width__half',[
			{value: false, displayName: 'User'},
			{value: true, displayName: 'Admin'}
		]),
		address = gInput('Address', 'text', user.address, 'full'),
		saveButton = gButton('Save', 'text', 'solid', 'md'),
		cancelButton = gButton('Cancel', 'text', 'outlined', 'md')


	let validate = () => {
		let inputs = [firstName, lastName, email, role, address]
		if (inputs.some(i => i.getIsValid === false))
			return console.log('false')

		return save(user.id, {
			firstName: firstName.getValue,
			lastName: lastName.getValue,
			email: email.getValue,
			isAdmin: role.value,
			address: address.getValue,
		})
	}


	return (
		<div className='change-profile-form-container'>
			<div className="info-form-container">
				<p className="title">REVIEW / EDIT</p>

				<Input configs={firstName}/>
				<Input configs={lastName}/>
				<Input configs={email}/>
				<Select configs={role}/>
				<Input configs={address}/>
			</div>

			{
				mode === 'edit' &&
				<div className="button-area">
					<Button configs={cancelButton} clickHandler={() => cancel()}/>
					<Button configs={saveButton} clickHandler={validate}/>
				</div>
			}
		</div>
	);
}

export default ChangeProfileForm;
