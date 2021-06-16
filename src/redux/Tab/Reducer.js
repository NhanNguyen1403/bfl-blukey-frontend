import {CHANGE_TAB} from "./Type";

const initialState = {
	currentTab: 'Home'
}

const tabReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_TAB:
			return {
				...state,
				currentTab: action.tabName
			}

		default: {
			return state
		}
	}
}

export default tabReducer
