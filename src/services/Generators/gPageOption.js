/************************************************************
 * Using this service to creat props for PageOption component
 ************************************************************/

exports.gPageOption = function (path=undefined, name = 'Option', size = 'lg', isActive= false) {
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
