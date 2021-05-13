/*******************************************************
 * Using this service to handle Session jobs
 * 1. Call Session Api
 * 2. Store credentials into localStorage
 * 3.	Update isLogged as a global (redux)
 * 4. Alert if error
 ********************************************************/

import store from "../../redux/store"
import {logIn} from "../../redux";

const Login = async function (email, password) {
	try {
		// 1.Call Session Api
		console.log('Call Log In Api with', email, password)

		// 2. Store credentials into localStorage
		localStorage.setItem('email', email)

		// 3.Update isLogged as a global (redux)
		store.dispatch(logIn())

	} catch (err) {
		console.log(err)
	}
}

export default Login