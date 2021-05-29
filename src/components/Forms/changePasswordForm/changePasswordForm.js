import React from 'react';

import "./changePasswordForm.scss"
import {generateInput} from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";

function ChangePasswordForm(props) {
  let user = JSON.parse(localStorage.getItem('user'))
  let {save, cancel} = props.clickHandler
  let oldPassword = generateInput('Old password', 'password', '', 'full'),
      newPassword = generateInput('New password', 'password', '', 'full'),
      confirmPassword = generateInput('Confirm password', 'password', '', 'full'),
      saveButton = generateButton('Save', 'text', 'solid', 'md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')

  let validate = () => {
    let inputs = [newPassword,confirmPassword]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('false')

    return save(user.id, {
      old_password: newPassword.getValue,
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
