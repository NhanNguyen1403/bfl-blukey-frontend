import axios from 'axios'

async function getUnit (endPoint, itemID) {
	try {
		let result = await axios({
			method: 'GET',
			url: `${process.env.SERVER_URL}/${endPoint}/${itemID}`,
			headers: {
				'Authorization': localStorage.getItem('token')
			}
		})
		return result
	} catch (err) {
		console.log(err)
	}

}
export default getUnit