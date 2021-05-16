/*******************************************************
 * Using this service to creat props for Input components
 ********************************************************/

exports.generateInput = function (labelName = '', type = '', size = '', isRequired = true) {
	try {
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