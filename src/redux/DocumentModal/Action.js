import {SHOW_DOCUMENT_MODAL, HIDE_DOCUMENT_MODAL} from "./Type";

export const showDocumentModal = (mode, doc) => {
  return {
    type: SHOW_DOCUMENT_MODAL,
    mode,
    doc,
  }
}

export const hideDocumentModal = () => {
  return {
    type: HIDE_DOCUMENT_MODAL
  }
}
