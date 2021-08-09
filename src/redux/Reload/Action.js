import {NEED_RELOAD, COMPLETE_RELOAD} from "./Type";

export const needReload = () => {
  return {
    type: NEED_RELOAD,
  }
}

export const completeReload = () => {
  return {
    type: COMPLETE_RELOAD
  }
}
