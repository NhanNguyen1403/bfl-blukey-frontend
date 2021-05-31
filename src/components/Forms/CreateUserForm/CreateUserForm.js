import React from 'react';

import "./CreateUserForm.scss"
import Input from "../../Inputs/Input/Input";
import {generateInput} from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import Post from '../../../services/Api/POST/post'

function CreateUserForm(props) {
	let {cancel} = props.clickHandler
	let firstName = generateInput('First name', 'text', '', 'half'),
			lastName = generateInput('Last name', 'text', '', 'half'),
			email = generateInput('Email', 'text', '', 'half'),
			role = generateInput('Role', 'text', '', 'half', true, ['User', 'Admin']),
			address = generateInput('Address', 'text', '', 'full'),
			userName = generateInput('Username', 'text', '', 'half'),
			password = generateInput('Password', 'password', '', 'half'),
			createButton = generateButton('Create', 'text', 'solid','md'),
			cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')

	let validate = () => {
		let inputs = [firstName,lastName,email,role,address,userName,password]
		console.log(inputs)
		if (inputs.some(i => i.getIsValid === false))
			return console.log('false')

		return create({
			first_name: firstName.getValue,
			last_name: lastName.getValue,
			email: email.getValue,
			is_admin: role.getValue === 'Admin',
			address: address.getValue,
			username: userName.getValue,
			password: password.getValue
		})
	}

	let create = async (payload) => {
		console.log('Create User:', payload)
		await Post('users', payload)
		cancel('Users', true)
	}

	return (
		<div className='user-form-container'>
			<div className="info-form-container">
				<p className="title">INFORMATION</p>

				<Input configs={firstName}/>
				<Input configs={lastName}/>
				<Input configs={email}/>
				<Input configs={role}/>
				<Input configs={address}/>
			</div>

			<div className="account-form-container">
				<p className="title">ACCOUNT</p>

				<Input configs={userName}/>
				<Input configs={password}/>
			</div>

			<div className="button-area">
				<Button configs={createButton} clickHandler={validate}/>
				<Button configs={cancelButton} clickHandler={() => cancel('Users')}/>
			</div>
		</div>
	);
}

export default CreateUserForm
