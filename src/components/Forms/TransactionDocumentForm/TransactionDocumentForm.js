import React from 'react';

import "./TransactionDocumentForm.scss"
import TransactionUploadForm from "./TransactionUploadForm/TransactionUploadForm";

function TransactionDocumentForm(props) {
  let {transaction, mode} = props.configs


  return (
    <div className={`transaction-document-form-container`}>
      <TransactionUploadForm configs={{transaction, mode, type: 'required'}}/>
      <TransactionUploadForm configs={{transaction, mode, type: 'optional'}}/>
    </div>
  );
}

export default TransactionDocumentForm;
