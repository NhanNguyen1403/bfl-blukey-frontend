/*******************************************************
 * Using this service to handle Session jobs
 * 1. Check isLogged (redux)
 * 2. Check localStorage
 ********************************************************/

import store from "../../redux/store"
import {logIn} from "../../redux";

const checkSession = async function () {
	let {isLogged} = store.getState().session

	// 1. Check isLogged (redux)
	if (isLogged)
		return true

	// 2. Check localStorage
	if (localStorage.getItem('token')) {
		store.dispatch(logIn())
		return true
	}

	return false
}

export default checkSession