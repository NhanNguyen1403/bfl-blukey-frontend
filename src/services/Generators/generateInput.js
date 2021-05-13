/*******************************************************
 * Using this service to creat props for Input components
 ********************************************************/

exports.generateInput = function (labelName, type, size, isRequired) {
	try {
		if (!labelName)
			return new Error("Missing labelName")
		if (!type)
			return new Error("Missing type")
		if (!size)
			return new Error("Missing size")

		return {
			labelName,
			type,
			size,
			isRequired,

			isValid: !isRequired,
			set setIsValid(status) {
				return this.isValid = status
			},
			get getIsValid() {
				return this.isValid
			},

			value: '',
			set setValue(newValue) {
				return this.value = newValue
			},
			get getValue() {
				return this.value
			}
		}
	} catch (err) {
		console.error(err)
	}
}