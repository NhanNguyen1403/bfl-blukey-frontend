import {CHANGE_TAB} from "./Type";

export const changeTab = (tabName) => {
  return {
    type: CHANGE_TAB,
    tabName,
  }
}
