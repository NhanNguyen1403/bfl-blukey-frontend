import {SHOW_MODAL, HIDE_MODAL} from "./Type";

export const showProfileModal = () => {
  return {
    type: SHOW_MODAL
  }
}

export const hideProfileModal = () => {
  return {
    type: HIDE_MODAL
  }
}
