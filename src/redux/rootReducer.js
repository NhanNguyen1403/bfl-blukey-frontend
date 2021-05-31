import {combineReducers} from "redux"

import sessionReducer from "./Session/Reducer"
import tabReducer from "./Tab/Reducer"
import profileModalReducer from "./ProfileModal/Reducer"
import snackReducer from "./SnackBar/Reducer"
import loaderReducer from "./Loader/Reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  tab: tabReducer,
  profileModal: profileModalReducer,
  snack: snackReducer,
  loader: loaderReducer,
})

export default rootReducer
