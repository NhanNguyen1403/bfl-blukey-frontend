/*******************************************************
 * Using this service to handle Login jobs
 * 1. Call Login Api
 * 2. Store credentials into localStorage
 * 3. Alert if error
 ********************************************************/

exports.Login = async function (email, password) {
	try {
		return console.log(email, password)
	} catch (err) {
		console.log(err)
	}
}