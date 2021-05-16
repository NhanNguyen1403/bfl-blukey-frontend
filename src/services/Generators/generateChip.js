/*******************************************************
 * Using this service to creat props for Chip components
 ********************************************************/

exports.generateChip = function (name = 'Alert!', type = 'error', isActive = false) {
	try {
		return {
			name,
			type,
			isActive,
			set setIsActive(newState) {
				return this.isActive = newState
			},
			get getIsActive() {
				return this.isActive
			}
		}
	} catch (err) {
		console.error(err)
	}
}
