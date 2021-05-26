import React from 'react';

import "./FilesForm.scss"

import Input from "../../Inputs/Input/Input";
import {generateInput} from "../../../services/Generators/generateInput";

function FilesForm(props) {
  let file = generateInput('File', 'file', '', 'full')

  let fileHandler = () => {
    if (file.getValue)
      return console.log('Save file:', file.getValue)

    return console.log('Ignore')
  }

  return (
    <div className='files-form-container'>
      <div className="info-form-container">
        <p className="title">NEW</p>

        <Input configs={file} fileHandler={fileHandler}/>

        <div className="files-area">
          <p className="title">YOUR FILES</p>
        </div>
      </div>
    </div>
  );
}

export default FilesForm;
