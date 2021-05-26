import React, {useEffect} from 'react';

import "./changeProfileForm.scss"
import {generateInput} from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";

function ChangeProfileForm(props) {
  let {save, cancel} = props.clickHandler
  let firstName = generateInput('First name', 'text', '', 'half'),
      lastName = generateInput('Last name', 'text', '', 'half'),
      email = generateInput('Email', 'text', '', 'half'),
      role = generateInput('Role', 'text', '', 'half', true, ['User', 'Admin']),
      address = generateInput('Address', 'text', '', 'full'),
      file = generateInput('Files', 'file', '', 'full'),
      saveButton = generateButton('Save', 'text', 'solid', 'md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')

  let validate = () => {
    let inputs = [firstName,lastName,email,role,address]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('false')

    return save({
      firstName: firstName.getValue,
      lastName: lastName.getValue,
      email: email.getValue,
      role: role.getValue,
      address: address.getValue,
    })
  }


  return (
    <div className='change-profile-form-container'>
      <div className="info-form-container">
        <p className="title">INFORMATION</p>

        <Input configs={firstName}/>
        <Input configs={lastName}/>
        <Input configs={email}/>
        <Input configs={role}/>
        <Input configs={address}/>
        <Input configs={file}/>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => cancel()}/>
      </div>
    </div>
  );
}

export default ChangeProfileForm;
