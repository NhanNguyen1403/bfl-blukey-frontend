import {SHOW_DOCUMENT_MODAL, HIDE_DOCUMENT_MODAL} from "./Type";

const initialState = {
	isDisplay: false,
	mode: 'view',
	doc: {},
}

const documentModalReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_DOCUMENT_MODAL:
			return {
				mode: action.mode,
				doc: action.doc,
				isDisplay: true,
			}

		case HIDE_DOCUMENT_MODAL:
			return {
				...state,
				isDisplay: false
			}

		default: {
			return state
		}
	}
}

export default documentModalReducer
