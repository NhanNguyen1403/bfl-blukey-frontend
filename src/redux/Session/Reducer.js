import {LOG_IN, LOG_OUT} from "./Type";

const initialState = {
	isLogged: false
}

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isLogged: true
			}

		case LOG_OUT:
			return {
				...state,
				isLogged: false
			}

		default: {
			return state
		}
	}
}

export default sessionReducer
