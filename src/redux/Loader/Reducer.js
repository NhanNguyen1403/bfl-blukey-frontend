import {SHOW_LOADER, HIDE_LOADER} from "./Type";

const initialState = {
	isDisplay: false
}

const loaderReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return {
				...state,
				isDisplay: true,
			}

		case HIDE_LOADER:
			return {
				...state,
				isDisplay: false,
			}

		default: {
			return state
		}
	}
}

export default loaderReducer
