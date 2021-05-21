import {SHOW_MODAL, HIDE_MODAL} from "./Type";

const initialState = {
	isDisplay: false
}

const profileModalReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				...state,
				isDisplay: true
			}

		case HIDE_MODAL:
			return {
				...state,
				isDisplay: false
			}

		default: {
			return state
		}
	}
}

export default profileModalReducer
