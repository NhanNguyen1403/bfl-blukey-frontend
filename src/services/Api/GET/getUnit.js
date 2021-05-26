import axios from 'axios'
import checkSession from '../../Session/checkSession'

async function getUnit (endPoint, itemID) {
	try {
		if (checkSession()) return

		let {data} = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}/${endPoint}/${itemID}`,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		})

		return data
	} catch (err) {
		console.log(err)
	}

}
export default getUnit
