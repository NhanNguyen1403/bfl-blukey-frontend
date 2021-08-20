import React from 'react';

import "./SnackBar.scss"
import {useDispatch, useSelector} from "react-redux";
import {hideSnack} from "../../redux"


function SnackBar({isLogging}) {
  let dispatch = useDispatch()
  let {isDisplay, message, snackType} = useSelector(state => {
    return state.snack
  })

  return (
    isDisplay && <div className={`snack-bar-container ${snackType} ${isLogging ? 'logging': ''}`}>
      <p className="content">{message}</p>

      <p className="close" onClick={() => dispatch(hideSnack())}>Close</p>
    </div>
  );
}

export default SnackBar;
