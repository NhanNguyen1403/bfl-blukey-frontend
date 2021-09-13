import React from 'react';

import "./changePasswordForm.scss"
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../redux";

function ChangePasswordForm(props) {
  let dispatch = useDispatch()
  let user = JSON.parse(localStorage.getItem('user'))
  let {save, cancel} = props.clickHandler
  let oldPassword = gInput('Old password', 'password', '', 'full'),
      newPassword = gInput('New password', 'password', '', 'full'),
      confirmPassword = gInput('Confirm password', 'password', '', 'full'),
      saveButton = gButton('Save', 'text', 'solid', 'md'),
      cancelButton = gButton('Cancel', 'text', 'outlined', 'md')

  let validate = () => {
    let inputs = [newPassword,confirmPassword]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('false')

    if (newPassword.getValue !== confirmPassword.getValue)
      return dispatch(showSnack('Confirm password unmatched', 'danger'))

    return save(user.id, {
      old_password: oldPassword.getValue,
      password: confirmPassword.getValue,
    })
  }

  return (
    <div className='change-password-form-container'>
      <div className="info-form-container">
        <p className="title">PASSWORD RESET</p>

        <Input configs={oldPassword}/>
        <Input configs={newPassword}/>
        <Input configs={confirmPassword}/>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => cancel()}/>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
