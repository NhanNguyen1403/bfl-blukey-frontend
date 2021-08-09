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
    if (transaction?.transactionStatus?.name === 'in progress')
      setMode('edit')
  }, [documentType])

  useEffect(() => {
    if (transaction?.transactionStatus?.name.toLowerCase() === 'in progress')
      setMode('edit')
  }, [transaction])


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
