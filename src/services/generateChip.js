/*******************************************************
 * Using this service to creat props for Chip components
 ********************************************************/

exports.generateInput = function (name, type) {
	try {
		if (!name)
			return new Error("Missing name")
		if (!type)
			return new Error("Missing type")

		return {
			name,
			type,
			isActive: false,
			set setIsActive(preState) {
				return this.isActive = !preState
			},
			get getIsActive() {
				return this.isActive
			}
		}

	} catch (err) {
		console.error(err)
	}
}