/*******************************************************
 * Using this service to handle Session jobs
 * 1. Remove localStorage credentials
 * 2. Update isLogged as a global (redux)
 ********************************************************/

import store from "../../redux/store"
import {logOut} from "../../redux";

const LogOut = async function () {
	// 1. Remove localStorage credentials
	localStorage.removeItem('token')
	localStorage.removeItem('user')

	// 2. Update isLogged as a global (redux)
	store.dispatch(logOut())
}

export default LogOut