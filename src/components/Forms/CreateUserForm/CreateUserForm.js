import React, {useState} from 'react';

import "./CreateUserForm.scss"
import Input from "../../Inputs/Input/Input";
import generateInput from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import Post from '../../../services/Api/POST/post'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {needReload} from "../../../redux";

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
			cancelButton = generateButton('Cancel', 'text', 'outlined', 'md'),
			history = useHistory(),
			dispatch = useDispatch()

	let validate = () => {
		let inputs = [firstName,lastName,email,role,address,userName,password]
		if (inputs.some(i => i.getIsValid === false))
			return console.log(false)

		return create({
			firstName: firstName.getValue,
			lastName: lastName.getValue,
			email: email.getValue,
			isAdmin: role.getValue === 'Admin',
			address: address.getValue,
			userName: userName.getValue,
			password: password.getValue
		})
	}

	let create = async (payload) => {
		await Post('users', payload)
		closeForm(true)
	}
	let closeForm = (requestReload = false) => {
		cancel('Users')
		history.push("/users")

		if (requestReload)
			dispatch(needReload())
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
				<Button configs={cancelButton} clickHandler={() => closeForm()}/>
				<Button configs={createButton} clickHandler={validate}/>
			</div>
		</div>
	);
}

export default CreateUserForm
