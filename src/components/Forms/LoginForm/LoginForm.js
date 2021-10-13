import React from 'react';
import "./LoginForm.scss"
import logo from "../../../assets/desktop/logo.png"
import Input from "../../Inputs/Input/Input";
import gInput from "../../../services/Generators/gInput"
import { gButton } from "../../../services/Generators/gButton"
import Login from "../../../services/Session/Login"
import Button from "../../Inputs/Button/Button";
import InputV2 from '../../Inputs/Input/InputV2';

function LoginForm() {
	let buttonLogin = gButton('Sign In', "text", 'solid', "lg"),
			refUsername = React.createRef(),
			refPassword = React.createRef()

	const validate = async (e) => {
		e.preventDefault()
		let email = refUsername.current.value,
				password = refPassword.current.value

		if (email.length < 3 || password.length < 3)
			return console.log('Invalid Form')
		return Login(email, password)
	}

	return (
		<div className="login-form-container">
			<img src={logo} alt="BluKey Logo" />

			<div className="input-group">
				<InputV2
					labelName='Username'
					type='text'
					styles='w-full mb-20'
					isRequired
					ref={refUsername}
				/>
				<InputV2
					labelName='Password'
					type='password'
					styles='w-full mb-30'
					isRequired
					ref={refPassword}
				/>
			</div>

			<div className="button-area">
				<Button clickHandler={validate} configs={buttonLogin} />
			</div>
		</div>
	);
}

export default LoginForm;
