/*******************************************************
 * Using this service to creat props for Input components
 ********************************************************/
import moment from "moment"

const generateInput = function (
	labelName = 'label',
	type = 'text',
	value,
	size = 'full',
	isRequired = true,
	data = [],
	isDisable = false, 
	keyPress = () => {}) {
	try {
		return {
			labelName,
			type,
			size,
			isRequired,
			isDisable,

			isValid: value && true,
			set setIsValid(status) {
				return this.isValid = status
			},
			get getIsValid() {
				return this.isValid
			},

			value: value,
			set setValue(newValue) {
				return this.value = newValue
			},
			get getValue() {
				return this.value
			},

			data,
			keyPress,
		}
	} catch (err) {
		console.error(err)
	}
}

export default generateInput
