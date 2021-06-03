import store from "../../redux/store";
import {hideLoader, hideSnack, showSnack} from "../../redux";
import LogOut from "../../services/Session/LogOut";

function errorHandler(err) {
	let {message} = err.response.data
	console.log(message)

	store.dispatch(hideLoader())
	if (message === 'Unauthorized.') {
		setTimeout(() => {
			store.dispatch(hideSnack())
			return LogOut()
		}, 3000)
		return store.dispatch(showSnack('Session expired, Logout soon!', 'danger'))
	}

	store.dispatch(showSnack(message || 'Error!' , 'danger'))
}

export default errorHandler