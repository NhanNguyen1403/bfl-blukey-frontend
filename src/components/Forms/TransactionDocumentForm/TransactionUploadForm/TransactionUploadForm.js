import React, {useEffect, useState} from 'react';

import "./TransactionUploadForm.scss"
import {generateInput} from "../../../../services/Generators/generateInput";
import Input from "../../../Inputs/Input/Input";
import {generateButton} from "../../../../services/Generators/generateButton";
import Button from "../../../Inputs/Button/Button";
import {useDispatch} from "react-redux";
import {showSnack} from "../../../../redux";

function TransactionUploadForm(props) {
  let dispatch = useDispatch(),
      {transaction, mode, type} = props.configs,
      [documents, setDocuments] = useState([
        {
          file_name: 'File1File1File1File1File1File1',
          id: 1231,
          url: 'http://google.com'
        },
        {
          file_name: 'File1',
          id: 1232,
          url: 'http://google.com'
        },
        {
          file_name: 'File1',
          id: 1233,
          url: 'http://google.com'
        },
        {
          file_name: 'File1',
          id: 1234,
          url: 'http://google.com'
        }
      ]),
      [typeInput, setTypeInput] = useState(generateInput('Type', 'text', '', 'full', true, ['Type-1', 'Type-2', 'Type-3'])),
      [documentInput, setDocumentInput] = useState(generateInput('Document', 'file', '', 'full', true)),
      submitButton = generateButton('Submit', 'text', 'solid', 'lg'),
      removeButton = generateButton('close', 'icon', 'secondary', 'md', 'close-icon')


  useEffect(() => {
    // get Uploaded
    // load rest of doc's type
  }, [])

  let validate = () => {
    console.log('File validation')

    if (!typeInput.isValid)
      dispatch(showSnack('Invalid Type1', 'danger '))

    if (!typeInput.data.some(i => i === typeInput.getValue))
      dispatch(showSnack('Invalid Type2', 'danger '))
  }

  let removeFile = () => {
    console.log('Remove File')
  }

  return (
    <div className={`transaction-upload-form-container`}>
      <span className="label">{type}</span>

      {
        mode === 'edit' &&
        <div className="upload-area">
          <p className="title">UPLOAD</p>

          <Input configs={typeInput}/>
          <Input configs={documentInput} fileHandler={() => {}}/>
          <Button configs={submitButton} clickHandler={validate}/>
        </div>
      }

      <div className="uploaded-area">
        <p className="title">UPLOADED</p>
        {
          documents.length === 0
            ? (<span>Documents uploaded will be here... </span>)
            : documents.map(i => {
              return (
                <div key={i.id} className="document" title={i.file_name}>
                  <a href={i.url} target="_blank">{i.file_name}</a>

                  {
                    mode === 'edit' &&
                    <div className="button-area">
                      <Button configs={removeButton} clickHandler={removeFile}/>
                    </div>
                  }
                </div>
              )
            })
        }
      </div>
    </div>
  );
}

export default TransactionUploadForm;
