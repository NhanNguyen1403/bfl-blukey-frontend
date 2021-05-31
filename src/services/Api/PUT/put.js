import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showSnack} from "../../../redux";
import {showLoader, hideLoader} from "../../../redux";

async function Put(endPoint = '', id = '', payload = {}) {
	try {
		if (!checkSession()) return

		store.dispatch(showLoader())
		let {data} = await axios({
			method: 'PUT',
			url: `${process.env.SERVER_URL}${endPoint}/${id}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			data: payload,
		})
		store.dispatch(hideLoader())

		store.dispatch(showSnack("Success", 'success'))
		return data
	} catch (err) {
		store.dispatch(hideLoader())
		store.dispatch(showSnack(err?.response?.data?.message || 'Error', 'danger'))
	}
}

export default Put
