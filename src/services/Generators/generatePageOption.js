/************************************************************
 * Using this service to creat props for PageOption component
 ************************************************************/

exports.generatePageOption = function (name = 'Option', size = 'lg', isActive = false) {
	try {
		return {
			name,
			size,
			isActive,
		}
	} catch (err) {
		console.error(err)
	}
}
