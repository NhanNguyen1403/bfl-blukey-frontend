import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {doSample} from "../../redux";

function SampleReduxHook() {
  const dispatch = useDispatch()
  const {count} = useSelector(state => {
    return state.sample
  })

  return (
    <div>
      <h1>Hook Count: {count}</h1>
      <button onClick={() => dispatch(doSample())}>Hook Increase</button>
    </div>
  );
}

export default SampleReduxHook;
