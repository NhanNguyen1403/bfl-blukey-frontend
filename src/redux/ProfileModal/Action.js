import {SHOW_MODAL, HIDE_MODAL} from "./Type";

export const showProfileModal = (mode, user) => {
  return {
    type: SHOW_MODAL,
    mode,
    user,
  }
}

export const hideProfileModal = () => {
  return {
    type: HIDE_MODAL
  }
}
