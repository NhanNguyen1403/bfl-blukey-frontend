import {SHOW_TRANSACTION_DETAIL_MODAL, HIDE_TRANSACTION_MODAL} from "./Type";

const initialState = {
	isDisplay: false,
	initMode: 'view',
	transactionDetail: {},
}

const transactionDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_TRANSACTION_DETAIL_MODAL:
			return {
				initMode: action.initMode,
				transactionDetail: action.transactionDetail,
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
