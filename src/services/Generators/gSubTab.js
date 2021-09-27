/*******************************************************
 * Using this service to creat props for SubTab components
 ********************************************************/

const gSubTab = function (
	tabs = [],
	currentTab = '',
	styles = ''
) {
	return {
		tabs,
		currentTab,
		styles
	}
}

export default gSubTab
