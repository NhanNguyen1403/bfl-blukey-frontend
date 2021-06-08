import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showLoader, hideLoader} from "../../../redux";
import errorHandler from "../errorHandler";

async function Delete(endPoint = '', id = '', payload = {}) {
	try {
		if (!checkSession()) return

		store.dispatch(showLoader())
		let {data} = await axios({
			method: 'DELETE',
			url: `${process.env.SERVER_URL}${endPoint}/${id}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			data: payload,
		})
		store.dispatch(hideLoader())

		return data
	} catch (err) {
		errorHandler(err)
	}
}

export default Delete
