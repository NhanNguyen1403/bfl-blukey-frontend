import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showLoader, hideLoader} from "../../../redux";
import errorHandler from "../errorHandler";

async function getAll (endPoint = '', pages = 1, params ={}) {
	try {
		if (!checkSession()) return

		store.dispatch(showLoader())
		let {data} = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}${endPoint}?page=${pages}&limit=25`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			params: params,
		})
		store.dispatch(hideLoader())

		return data
	} catch (err) {
		errorHandler(err)
	}
}

export default getAll
