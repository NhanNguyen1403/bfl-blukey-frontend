import {SHOW_MODAL, HIDE_MODAL} from "./Type";

const initialState = {
	isDisplay: false,
	mode: 'view',
	user: {},
}

const profileModalReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				mode: action.mode,
				user: action.user,
				isDisplay: true,
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
