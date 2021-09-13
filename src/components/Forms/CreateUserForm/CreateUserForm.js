import React, {useState} from 'react';

import "./CreateUserForm.scss"
import Input from "../../Inputs/Input/Input";
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Button from "../../Inputs/Button/Button";
import Post from '../../../services/Api/POST/post'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {needReload} from "../../../redux";
import gSelect from "../../../services/Generators/gSelect";
import Select from "../../Inputs/Select/Select";

function CreateUserForm(props) {
	let {cancel} = props.clickHandler
	let firstName = gInput('First name', 'text', '', 'half'),
			lastName = gInput('Last name', 'text', '', 'half'),
			email = gInput('Email', 'text', '', 'half'),
			role = gSelect('Role', false, 'width__half',[
				{value: false, displayName: 'User'},
				{value: true, displayName: 'Admin'}
			]),
			address = gInput('Address', 'text', '', 'full'),
			userName = gInput('Username', 'text', '', 'half'),
			password = gInput('Password', 'password', '', 'half'),
			createButton = gButton('Create', 'text', 'solid','md'),
			cancelButton = gButton('Cancel', 'text', 'outlined', 'md'),
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
			isAdmin: role.value,
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
				<Select configs={role}/>
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
