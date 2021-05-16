import React, {Component} from 'react';
import "./Login.scss"
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

class Login extends Component {
	render() {
		return (
			<div className="login-container">
				<div className="sub-background" />

				<LoginForm/>
			</div>
		);
	}
}

export default Login;
