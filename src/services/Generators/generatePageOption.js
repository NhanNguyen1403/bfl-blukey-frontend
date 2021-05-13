/************************************************************
 * Using this service to creat props for PageOption component
 ************************************************************/

exports.generatePageOption = function (name, size, isActive) {
	try {
		if (!name)
			return new Error("Missing name")
		if (!size)
			return new Error("Missing type")

		return {
			name,
			size,
			isActive: isActive || false,
		}
	} catch (err) {
		console.error(err)
	}
}
