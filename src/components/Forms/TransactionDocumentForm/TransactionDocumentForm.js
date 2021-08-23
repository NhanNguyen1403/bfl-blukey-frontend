import React, {useEffect, useState} from 'react';

import "./TransactionDocumentForm.scss"
import TransactionUploadForm from "./TransactionUploadForm/TransactionUploadForm";
import getAll from "../../../services/Api/GET/getAll";

function TransactionDocumentForm(props) {
  let {transaction, documentType} = props.configs,
      [mode, setMode] = useState('view'),
      [required, setRequired] = useState({uploaded: [], rest: []}),
      [optional, setOptional] = useState({uploaded: [], rest: []}),
      {updateCanComplete, userEdited, loadDocuments} = props.clickHandler


  useEffect(() => {
    setRequired({
      uploaded: documentType.requiredDocumentUploaded,
      rest: documentType.restOfRequiredDocument
    })
    setOptional({
      uploaded: documentType.optionalDocumentUploaded,
      rest: documentType.restOfOptionalDocument
    })
    isEditMode()
  }, [documentType])

  useEffect(() => {
    isEditMode()
  }, [transaction])

  let isEditMode = () => {
    let {id} = JSON.parse(localStorage.getItem('user')),
        status = transaction?.transactionStatus?.name?.toLowerCase()

    // only owner transaction can upload and only apply for in progress status
    if (id === transaction.user.id && status === 'in progress')
      return setMode('edit')
    return setMode('view')
  }


  return (
    <div className={`transaction-document-form-container`}>
      <TransactionUploadForm
        configs={{transaction, mode, type: 'Required', documents: required}}
        clickHandler={{updateCanComplete, userEdited, loadDocuments}}
      />
      <TransactionUploadForm
        configs={{transaction, mode, type: 'Optional', documents: optional}}
        clickHandler={{updateCanComplete, userEdited, loadDocuments}}
      />
    </div>
  );
}

export default TransactionDocumentForm;
