import React, {useEffect} from 'react';

import "./changeProfileForm.scss"
import {generateInput} from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";

function ChangeProfileForm(props) {
	let {save, cancel} = props.clickHandler
	let {mode, user} = props.configs

	let firstName = generateInput('First name', 'text', user.first_name, 'half'),
		lastName = generateInput('Last name', 'text', user.last_name, 'half'),
		email = generateInput('Email', 'text', user.email, 'half'),
		role = generateInput('Role', 'text', user.is_admin ? 'Admin' : 'User', 'half', true, ['User', 'Admin']),
		address = generateInput('Address', 'text', user.address, 'full'),
		saveButton = generateButton('Save', 'text', 'solid', 'md'),
		cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')

	let validate = () => {
		let inputs = [firstName, lastName, email, role, address]
		console.log(inputs)
		if (inputs.some(i => i.getIsValid === false))
			return console.log('false')

		return save(user.id, {
			first_name: firstName.getValue,
			last_name: lastName.getValue,
			email: email.getValue,
			is_admin: role.getValue === 'Admin',
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
					<Button configs={saveButton} clickHandler={validate}/>
					<Button configs={cancelButton} clickHandler={() => cancel()}/>
				</div>
			}
		</div>
	);
}

export default ChangeProfileForm;
