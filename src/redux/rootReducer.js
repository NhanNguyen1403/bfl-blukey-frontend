import {combineReducers} from "redux"

import sessionReducer from "./Session/Reducer"
import tabReducer from "./Tab/Reducer"
import profileModalReducer from "./ProfileModal/Reducer"
import transactionDetailReducer from "./TransactionDetail/Reducer"
import snackReducer from "./SnackBar/Reducer"
import loaderReducer from "./Loader/Reducer";
import reloadReducer from "./Reload/Reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  tab: tabReducer,
  profileModal: profileModalReducer,
  snack: snackReducer,
  loader: loaderReducer,
  transactionDetail: transactionDetailReducer,
  reload: reloadReducer,
})

export default rootReducer
