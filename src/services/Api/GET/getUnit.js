import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showSnack} from "../../../redux";

async function getUnit (endPoint = '', itemID = '') {
	try {
		if (!checkSession()) return

		let {data} = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}${endPoint}/${itemID}`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})

		return data
	} catch (err) {
		console.log(err)
		store.dispatch(showSnack(err?.response?.data?.message || 'Error','danger'))
	}

}
export default getUnit
