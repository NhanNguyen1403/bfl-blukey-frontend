import React, { useState } from 'react';
import "./Login.scss"
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import ForgetPassword from '../../components/Forms/ForgetPassword/ForgetPassword';


function Login() {
	let [displayForgotPasswordForm, setDisplayForgotPasswordForm] = useState(false)

	let toggleForgetPasswordForm = () => {
		setDisplayForgotPasswordForm(prevState => {
			return !prevState
		})
	}

	return (
		<div className="login-container">
			<div className="sub-background" />

			{
				!displayForgotPasswordForm && <LoginForm />
			}
			{
				displayForgotPasswordForm && <ForgetPassword />
			}
			<p onClick={toggleForgetPasswordForm}>
				{
					!displayForgotPasswordForm
						? 'Forgot your password?'
						: 'Sign In'
				}
			</p>

		</div>
	);
}

export default Login
