/*******************************************************
 * Using this service to handle Session jobs
 * 1. Remove localStorage credentials
 * 2. Update isLogged as a global (redux)
 ********************************************************/

import store from "../../redux/store"
import {logOut} from "../../redux";
import Post from "../Api/POST/post"

const LogOut = async function (isClearSession = false) {
	console.log('Log Out')

	// 0. Clear token session
	if (isClearSession)
		Post('logout')

	// 1. Remove localStorage credentials
	localStorage.removeItem('token')
	localStorage.removeItem('user')

	// 2. Update isLogged as a global (redux)
	store.dispatch(logOut())
}

export default LogOut
