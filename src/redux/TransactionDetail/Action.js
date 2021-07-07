import {SHOW_TRANSACTION_DETAIL_MODAL, HIDE_TRANSACTION_MODAL} from "./Type";

export const showTransactionDetail = (mode, transaction) => {
  return {
    type: SHOW_TRANSACTION_DETAIL_MODAL,
    mode,
    transaction,
  }
}

export const hideTransactionDetail = () => {
  return {
    type: HIDE_TRANSACTION_MODAL
  }
}
