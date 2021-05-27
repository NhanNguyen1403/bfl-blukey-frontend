import {SHOW_SNACK, HIDE_SNACK} from "./Type";

const initialState = {
	isDisplay: true,
	message: 'Error!',
	snackType: 'danger',
}

const snackReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_SNACK:
			return {
				...state,
				isDisplay: true,
				message: action.message,
				snackType: action.snackType,
			}

		case HIDE_SNACK:
			return {
				...state,
				isDisplay: false
			}

		default: {
			return state
		}
	}
}

export default snackReducer
