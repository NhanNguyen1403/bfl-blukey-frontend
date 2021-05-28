import axios from 'axios'
import checkSession from '../../Session/checkSession'

async function getAll (endPoint = '', pages = 1) {
	try {
		if (!checkSession()) return

		let {data} = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}/${endPoint}?page=${pages}&limit=25`,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		})

		return data
	} catch (err) {
		console.log(err)
	}
}

export default getAll
