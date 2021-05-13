import {combineReducers} from "redux"

import sampleReducer from "./Sample/Reducer"
import sessionReducer from "./Session/Reducer"
import tabReducer from "./Tab/Reducer"

const rootReducer = combineReducers({
  sample: sampleReducer,
  session: sessionReducer,
  tab: tabReducer,
})

export default rootReducer
