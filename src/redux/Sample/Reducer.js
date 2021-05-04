import {SAMPLE} from "./Type"

const initialState = {
  count: 1
}

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE: {
      console.log(1, state)
      return {
        ...state,
        count: state.count + 1
      }
    }

    default: {
      return state
    }
  }
}

export default sampleReducer
