import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showLoader, hideLoader} from "../../../redux";
import errorHandler from "../errorHandler";

async function getAll (endPoint = '', params ={}) {
	try {
		if (!checkSession()) return

		store.dispatch(showLoader())
		let {data} = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}${endPoint}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			params: {
				page: params.page || 1,
				limit: params.limit || 25,
				...params,
			},
		})
		store.dispatch(hideLoader())

		return data
	} catch (err) {
		errorHandler(err)
	}
}

export default getAll
