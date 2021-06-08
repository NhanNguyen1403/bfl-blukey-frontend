import {SHOW_SNACK, HIDE_SNACK} from "./Type";

export const showSnack = (message, snackType) => {
  return {
    type: SHOW_SNACK,
    message,
    snackType,
  }
}

export const hideSnack = () => {
  return {
    type: HIDE_SNACK
  }
}
