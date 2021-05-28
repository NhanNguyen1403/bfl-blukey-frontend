import React from 'react';
import "./LoginForm.scss"
import logo from "../../../assets/desktop/logo.png"
import Input from "../../Inputs/Input/Input";
import {generateInput} from "../../../services/Generators/generateInput"
import {generateButton} from "../../../services/Generators/generateButton"
import Login from "../../../services/Session/Login"
import Button from "../../Inputs/Button/Button";

function LoginForm() {
	let usernameInput = generateInput("Username", "text", '', "lg", true),
			passwordInput = generateInput("Password", "password", '', "lg", true),
			loginButton = generateButton('Sign In', "text", 'solid',  "lg")

	let inputConfig = [usernameInput, passwordInput]

	const clickHandler = async (e) => {
		e.preventDefault()
		if (!usernameInput.getIsValid || !passwordInput.getIsValid)
			return console.log(false)

		let email = usernameInput.getValue,
				password = passwordInput.getValue

		await Login(email, password)
	}

	return (
		<div className="login-form-container">
			<img src={logo} alt="BluKey Logo"/>

			<div className="input-group">
				{
					inputConfig.map(i =>
						<Input key={i.labelName} configs={i}/>
					)
				}
			</div>

			<div className="button-area">
				<Button clickHandler={clickHandler} configs={loginButton}/>
			</div>
		</div>
	);
}

export default LoginForm;
