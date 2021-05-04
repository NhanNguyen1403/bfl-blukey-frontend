import {combineReducers} from "redux"
import sampleReducer from "./Sample/Reducer"

const rootReducer = combineReducers({
  sample: sampleReducer
})

export default rootReducer
