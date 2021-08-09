import {SHOW_TRANSACTION_DETAIL_MODAL, HIDE_TRANSACTION_MODAL} from "./Type";

export const showTransactionDetail = (initMode, transactionDetail) => {
  return {
    type: SHOW_TRANSACTION_DETAIL_MODAL,
    initMode,
    transactionDetail,
  }
}

export const hideTransactionDetail = () => {
  return {
    type: HIDE_TRANSACTION_MODAL
  }
}
