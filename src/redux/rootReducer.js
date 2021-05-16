import {combineReducers} from "redux"

import sessionReducer from "./Session/Reducer"
import tabReducer from "./Tab/Reducer"

const rootReducer = combineReducers({
  session: sessionReducer,
  tab: tabReducer,
})

export default rootReducer
