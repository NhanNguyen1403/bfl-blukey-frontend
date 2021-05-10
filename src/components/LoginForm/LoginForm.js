import React, {useEffect, useState} from 'react';
import "./LoginForm.scss"
import logo from "../../assets/desktop/logo.png"
import Input from "../Input/Input";
import {generateInput} from "../../services/generateInput"
import {generateButton} from "../../services/generateButton"
import {Login} from "../../services/Login"
import Button from "../Button/Button";

function LoginForm(props) {
	let emailInput = generateInput("Email", "text", "lg", true),
			passwordInput = generateInput("Password", "password", "lg", true),
			loginButton = generateButton('Sign In', "default", "lg")

	let inputConfig = [emailInput, passwordInput]

	const clickHandler = async (e) => {
		e.preventDefault()
		if (!emailInput.getIsValid || !passwordInput.getIsValid)
			return console.log(false)

		let email = emailInput.getValue,
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
