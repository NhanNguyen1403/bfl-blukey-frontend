/*******************************************************
 * Using this service to handle Session jobs
 * 1. Call Session Api
 * 2. Store credentials into localStorage
 * 3.	Update isLogged as a global (redux)
 * 4. Get user Info
 * 5. Alert if error
 ********************************************************/

import store from "../../redux/store"
import {logIn, showSnack} from "../../redux";
import Post from "../Api/POST/post"
import getAll from "../Api/GET/getAll"

const Login = async function (username, password) {
	try {
		// 1.Call Session Api
		console.log('Call Log In Api with', username, password)
		let {data: loginResult} = await Post('login', {username, password}, true)

		// 2. Store credentials into localStorage
		localStorage.setItem('token', loginResult.access_token)

		// 3.Update isLogged as a global (redux)
		store.dispatch(logIn())

		// 4. Get user info
		let {data: getInfoResult} = await getAll('info')
		localStorage.setItem('user', JSON.stringify(getInfoResult))

	} catch (err) {
		console.log(err)
	}
}

export default Login
