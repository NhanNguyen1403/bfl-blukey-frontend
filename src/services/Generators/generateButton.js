/*********************************************************
 * Using this service to create props for Button component
 * ********************************************************/

exports.generateButton = function (name, type, size, icon) {
	try {
		if (!name)
			return new Error("Missing name")
		if (!size)
			return new Error("Missing size")
		if (!type)
			return new Error("Missing type")

		return {
			name,
			type,
			size,
			icon,
		}

	} catch (err) {
		console.error(err)
	}

}