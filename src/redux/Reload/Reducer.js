import {NEED_RELOAD, COMPLETE_RELOAD} from "./Type";

const initialState = {
	needReload: false
}

const reloadReducer = (state = initialState, action) => {
	switch (action.type) {
		case NEED_RELOAD:
			return {
				needReload: true,
			}

		case COMPLETE_RELOAD:
			return {
				needReload: false,
			}

		default: {
			return state
		}
	}
}

export default reloadReducer
