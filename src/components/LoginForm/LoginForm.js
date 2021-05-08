import React from 'react';
import "./LoginForm.scss"
import logo from "../../assets/desktop/logo.png"
import Input from "../Input/Input";
import {inputConfig} from "./LoginFormConfig"

function LoginForm(props) {

  return (
    <div className="login-form-container">
      <img src={logo} alt="BluKey Logo"/>

      <div className="input-group">
        {
          inputConfig.map(i =>
            <Input
              key={i.labelName}
              type={i.type}
              size={i.size}
              labelName={i.labelName}
              isRequired={i.isRequired}
              isValid={i.isValid}
              getValue={i.getValue}
            />
          )
        }
      </div>

    </div>
  );
}

export default LoginForm;
