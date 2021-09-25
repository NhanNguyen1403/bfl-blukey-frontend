import React, {useEffect, useState} from 'react';

import "./TransactionDocumentFormV2.scss"

import SubTab from '../../Inputs/SubTab/SubTab';
import gSubTab from '../../../services/Generators/gSubTab'
import TransactionUploadFormV2 from './TransactionUploadForm/TransactionUploadFormV2';


function TransactionDocumentFormV2(props) {
  let {transaction, documentType} = props.configs,
      [mode, setMode] = useState('view'),
      [required, setRequired] = useState({uploaded: [], rest: []}),
      [optional, setOptional] = useState({uploaded: [], rest: []}),
      {updateCanComplete, userEdited, loadDocuments} = props.clickHandler,
      [subTabConfig, setSubTabConfig] = useState(gSubTab(
        ['Required', 'Optional'],
        'Required',
      ))


  useEffect(() => {
    setRequired({
      uploaded: extractUploaded('required'),
      rest: extractRest('required'),
      process: documentType.numberProcessRequired,
    })
    setOptional({
      uploaded: extractUploaded('optional'),
      rest: extractRest('optional'),
      process: documentType.numberProcessOptional,
    })
    isEditMode()
  }, [documentType])

  useEffect(() => {
    isEditMode()
  }, [transaction])



  let extractUploaded = (type) => {
    return {
      listing: documentType.listing[type].uploaded,
      buying: documentType.buying[type].uploaded
    }
  }

  let extractRest = (type) => {
    let transactionType = documentType.transactionIsListing ? 'listing' : 'buying'
    return documentType[transactionType][type].rest
  }

  let isEditMode = () => {
    let {id} = JSON.parse(localStorage.getItem('user')),
        status = transaction?.transactionStatus?.name?.toLowerCase()

    // only owner transaction can upload and only apply for in progress status
    if (id === transaction.user.id && status === 'in progress')
      return setMode('edit')
    return setMode('view')
  }

  let changeSubTab = (newTab) => {
    let {tabs} = subTabConfig
    setSubTabConfig(gSubTab(tabs, newTab))
  }

  return (
    <div className={`transaction-document-form-container`}>
      <SubTab configs={subTabConfig} handlers={{changeSubTab}}/>

      {
        subTabConfig.currentTab === 'Required' && 
        <TransactionUploadFormV2
          configs={{transaction, mode, type: 'Required', documents: required}}
          clickHandler={{updateCanComplete, userEdited, loadDocuments}}
        />
      }
      {
        subTabConfig.currentTab === 'Optional' &&
        <TransactionUploadFormV2
        configs={{transaction, mode, type: 'Optional', documents: optional}}
        clickHandler={{updateCanComplete, userEdited, loadDocuments}}
      />
      }
    </div>
  );
}

export default TransactionDocumentFormV2;
