/*********************************************************
 * Using this service to create props for Button component
 * ********************************************************/

exports.generateButton = function (name = 'Button', type = 'default', size = '', icon = '',) {
	try {
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