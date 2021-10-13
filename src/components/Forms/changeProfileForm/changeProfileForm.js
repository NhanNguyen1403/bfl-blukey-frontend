import React, {useEffect} from 'react';

import "./changeProfileForm.scss"
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";
import gSelect from "../../../services/Generators/gSelect";
import Select from "../../Inputs/Select/Select";

function ChangeProfileForm(props) {
	let {save, cancel} = props.clickHandler,
	 		{mode, user} = props.configs,
			firstName 		= gInput('First name', 'text', user.firstName, 'half'),
			lastName 			= gInput('Last name', 'text', user.lastName, 'half'),
			email 				= gInput('Email', 'text', user.email, 'half'),
			address 			= gInput('Address', 'text', user.address, 'full'),
			saveButton 		= gButton('Save', 'text', 'solid', 'md'),
			buttonCancel 	= gButton('Cancel', 'text', 'outlined', 'md'),
			role 					= gSelect('Role', user.isAdmin, 'width__half',[
				{value: false, displayName: 'User'},
				{value: true, displayName: 'Admin'}
			])


	let validate = () => {
		let inputs = [firstName, lastName, email, role, address]
		if (inputs.some(i => i.getIsValid === false))
			return console.log('Form Invalid')

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
					<Button configs={buttonCancel} clickHandler={() => cancel()}/>
					<Button configs={saveButton} clickHandler={validate}/>
				</div>
			}
		</div>
	);
}

export default ChangeProfileForm;
