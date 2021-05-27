import React from 'react';

import "./SnackBar.scss"
import {useDispatch, useSelector} from "react-redux";
import {hideSnack} from "../../redux"


function SnackBar() {
  let dispatch = useDispatch()
  let {isDisplay, message, snackType} = useSelector(state => {
    return state.snack
  })

  return (
    isDisplay && <div className={`snack-bar-container ${snackType}`}>
      <p className="content">{message}</p>

      <p className="close" onClick={() => dispatch(hideSnack())}>Hide</p>
    </div>
  );
}

export default SnackBar;
