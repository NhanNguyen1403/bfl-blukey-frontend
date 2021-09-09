import React, {useEffect} from 'react';

import "./changeProfileForm.scss"
import generateInput from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";

function ChangeProfileForm(props) {
	let {save, cancel} = props.clickHandler
	let {mode, user} = props.configs

	let isOwnerAdmin = () => {
		let {isAdmin} = JSON.parse(localStorage.getItem('user'))
		return isAdmin === true
	}

	let firstName = generateInput('First name', 'text', user.firstName, 'half'),
		lastName = generateInput('Last name', 'text', user.lastName, 'half'),
		email = generateInput('Email', 'text', user.email, 'half'),
		role = generateInput('Role', 'text', user.isAdmin ? 'Admin' : 'User', 'half', true, ['User', 'Admin'], !isOwnerAdmin()),
		address = generateInput('Address', 'text', user.address, 'full'),
		saveButton = generateButton('Save', 'text', 'solid', 'md'),
		cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')


	let validate = () => {
		let inputs = [firstName, lastName, email, role, address]
		if (inputs.some(i => i.getIsValid === false))
			return console.log('false')

		return save(user.id, {
			firstName: firstName.getValue,
			lastName: lastName.getValue,
			email: email.getValue,
			isAdmin: role.getValue === 'Admin',
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
				<Input configs={role}/>
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
