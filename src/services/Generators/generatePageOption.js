/************************************************************
 * Using this service to creat props for PageOption component
 ************************************************************/

exports.generatePageOption = function (path='', name = 'Option', size = 'lg', isActive= false) {
	try {
		return {
			path,
			name,
			size,
			isActive,
		}
	} catch (err) {
		console.error(err)
	}
}
