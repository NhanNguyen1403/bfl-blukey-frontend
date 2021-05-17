import axios from 'axios'

async function getAll (endPoint, pages) {
	try {
		let result = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}/${endPoint}?page=${pages}&limit=25`,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		})
		return result
	} catch (err) {
		console.log(err)
	}
}

export default getAll