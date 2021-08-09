import React, {useEffect, useState} from 'react';

import "./TransactionUploadForm.scss"
import generateInput from "../../../../services/Generators/generateInput";
import Input from "../../../Inputs/Input/Input";
import Button from "../../../Inputs/Button/Button";
import {generateButton} from "../../../../services/Generators/generateButton";
import {useDispatch} from "react-redux";
import {hideSnack, showSnack} from "../../../../redux";
import Post from "../../../../services/Api/POST/post";
import Delete from "../../../../services/Api/DELETE/delete";

function TransactionUploadForm(props) {
  let dispatch = useDispatch(),
      {transaction, mode, type, documents} = props.configs,
      {updateCanComplete, userEdited, loadDocuments} = props.clickHandler,
      [uploadedDocuments, setUploadedDocuments] = useState([]),
      [restDocuments, setRestDocuments] = useState([]),
      [typeInput, setTypeInput] = useState(generateInput(`Type`, 'text', '', 'full', true, [])),
      [documentInput, setDocumentInput] = useState(generateInput('Document', 'file', '', 'full', true)),
      submitButton = generateButton('Submit', 'text', 'solid', 'lg'),
      removeButton = generateButton('close', 'icon', 'secondary', 'md', 'close-icon')



  useEffect(() => {
    setTypeInput(generateInput(`Type`, 'text', '', 'full', true, restDocuments.map(i => i.documentTypeName)))
  }, [restDocuments])

  useEffect(() => {
    if (documents.uploaded && documents.rest) {
      setUploadedDocuments(documents.uploaded)
      setRestDocuments(documents.rest)
    }
  }, [documents])

  let validate = () => {
    console.log('File validation')

    if (!documentInput.getValue) return console.log('Ignore')

    if (!typeInput.isValid)
      return dispatch(showSnack('Invalid type', 'danger'))

    let documentType = restDocuments.find(i => i.documentTypeName === typeInput.getValue)

    if (!/\.pdf$/.test(documentInput.getValue.name))
			return dispatch(showSnack('Document should be PDF file', 'danger'))
		else
			dispatch(hideSnack())

    upload(documentType)
  }

  let upload = async (documentType) => {
    console.log('Upload document')
    let formData = new FormData(),
        params = {
          transactionId: transaction.id,
          documentTypeId: documentType.id || documentType.documentTypeId
        }

    formData.append('pdf', documentInput.getValue)
		let {data} = await Post('uploadTransactionDocumentType', formData, false, params)
    if (data.file) {
      loadDocuments()
      checkCanComplete(false, data.canComplete)
      userEdited()
    }
  }
  let remove = async (file) => {
    let payload = {
      transactionId: transaction.id,
      documentTypeId: file.id || file.documentTypeId
    }

    let {data} = await Delete('uploadTransactionDocumentType','', payload)
    if (data.file) {
      loadDocuments()
      checkCanComplete(true, data.canComplete)
      userEdited()
    }
  }
  let checkCanComplete = (preCanComplete, postCanComplete) => {
    // upload: false -> true
    // remove: true -> false
    if (preCanComplete !== postCanComplete)
      updateCanComplete(postCanComplete)
  }


  return (
    <div className={`transaction-upload-form-container`}>
      <span className="label">{type}</span>

      <div className="scroll">
        {
          mode === 'edit' &&
          <div className="upload-area">
            <p className="title">UPLOAD ({uploadedDocuments.length}/{uploadedDocuments.length + restDocuments.length})</p>

            <Input configs={typeInput}/>
            <Input configs={documentInput} fileHandler={() => {}}/>
            <Button configs={submitButton} clickHandler={validate}/>
          </div>
        }

        <div className="uploaded-area">
          <p className="title">UPLOADED {}</p>

          <div className="uploaded">
            {
              uploadedDocuments.length === 0
                ? (<span>Documents uploaded will be here... </span>)
                : uploadedDocuments.map(i => {
                  return (
                    <div key={i.fileName} className="document" title={i.fileName}>
                      <a href={i.url} target="_blank">{i.documentTypeName}</a>

                      {
                        mode === 'edit' &&
                        <div className="button-area">
                          <Button configs={removeButton} clickHandler={() => remove(i)}/>
                        </div>
                      }
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionUploadForm;
