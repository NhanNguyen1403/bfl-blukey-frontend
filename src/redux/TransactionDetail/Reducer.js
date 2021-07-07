import {SHOW_TRANSACTION_DETAIL_MODAL, HIDE_TRANSACTION_MODAL} from "./Type";

const initialState = {
	isDisplay: false,
	mode: 'view',
	transaction: {},
}

const transactionDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_TRANSACTION_DETAIL_MODAL:
			return {
				mode: action.mode,
				transaction: action.transaction,
				isDisplay: true,
			}

		case HIDE_TRANSACTION_MODAL:
			return {
				...state,
				isDisplay: false
			}

		default: {
			return state
		}
	}
}

export default transactionDetailReducer
