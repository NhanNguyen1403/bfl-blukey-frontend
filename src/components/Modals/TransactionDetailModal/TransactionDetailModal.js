import React, {useEffect, useState} from 'react';

import "./TransactionDetailModal.scss"
import PageOption from "../../Inputs/pageOption/pageOption";
import Button from "../../Inputs/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {generatePageOption} from "../../../services/Generators/generatePageOption";
import {generateButton} from "../../../services/Generators/generateButton";
import {hideTransactionDetail, needReload} from "../../../redux";
// import Put from "../../../services/Api/PUT/put";
// import getAll from "../../../services/Api/GET/getAll";
import getAll from "../../../services/Api/GET/getAll";
import Status from "../../Forms/Status/Status";
import TransactionForm from "../../Forms/TransactionForm/TransactionForm";
import TransactionDocumentForm from "../../Forms/TransactionDocumentForm/TransactionDocumentForm";
import Comment from "../../Forms/Comment/Comment";
import getUnit from "../../../services/Api/GET/getUnit";

function TransactionDetailModal(props) {
  let dispatch = useDispatch(),
      {isDisplay, initMode, transactionDetail} = useSelector(state => {
        return state.transactionDetail
      }),
      [mode, setMode] = useState(initMode),
      [transaction, setTransaction] = useState(transactionDetail),
      [comments, setComments] = useState([]),
      [canComplete, setCanComplete] = useState(false),
      [optionList, setOptionList] = useState([
        generatePageOption('','Transaction', 'md', true),
        generatePageOption('','Documents', 'md', false),
        generatePageOption('','Comments', 'md', false),
      ]),
      [statusConfig, setStatusConfig] = useState({}),
      [documentType, setDocumentType] = useState({}),
      [isUserEdited, setIsUserEdited] = useState(false),
      closeButton = generateButton('close', 'icon', 'solid', 'md', 'close-icon')



  useEffect(async () => {
    setTransaction(transactionDetail)
  }, [transactionDetail])
  useEffect(() => {
    setMode(initMode)
  }, [initMode])
  useEffect(async () => {
    await loadDocuments()
    setComments(transaction.comments)
  }, [transaction])
  useEffect(() => {
    if (transaction && transaction.user)
      setStatusConfig({
        transactionId: transaction.id,
        userId: transaction.user.id,
        activeStatus: transaction.transactionStatus.name,
        mode: 'edit',
        isActionDisable: !canComplete
      })
  }, [documentType, transaction, canComplete])


  let changeOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.path, i.name, i.size, i.name === optionName)
    }))
  }
  let loadDocuments = async () => {
    if (transaction && transaction.id) {
      let {data} = await getAll('documentTypes', {transactionId: transaction.id})
      setCanComplete(data.canComplete)
      setDocumentType(data)
    }
  }
  let closeModal = () => {
    dispatch(hideTransactionDetail())
    setOptionList([
      generatePageOption(undefined,'Transaction', 'md', true),
      generatePageOption(undefined,'Documents', 'md', false),
      generatePageOption(undefined,'Comments', 'md', false),
    ])
    if (isUserEdited) {
      dispatch(needReload())
      setIsUserEdited(false)
    }
  }
  let userEdited = () => {
    if (!isUserEdited)
      setIsUserEdited(true)
  }
  let updateCanComplete = (newCanComplete) => {
    setCanComplete(newCanComplete)
  }
  let reloadDetailTransaction = async () => {
    let {data} = await getUnit('transactions', transaction.id)
    updateMode(data.transactionStatus.name)
    setTransaction(data)
  }
  let updateMode = (status) => {
    let {isAdmin, id} = JSON.parse(localStorage.getItem('user'))

    status = status.toLowerCase()

    // user + new/in-progress -> edit
    if ((!isAdmin || (isAdmin && id === transaction.user.id)) &&
      (status === 'new' || status === 'in progress'))
      return setMode('edit')

    // the rest are view
    return setMode('view')
  }



  return (
    isDisplay && <div className='transaction-detail-container'>
      <div className="modal-content">
        <div className="options-area">
          {
            optionList.map(i => {
              return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changeOption}/>)
            })
          }
          <div className="button-area">
            <Button configs={closeButton} clickHandler={closeModal}/>
          </div>
        </div>

        <div className={`status-actions ${optionList[0].isActive ? 'transaction' : ''}`}>
          <Status configs={statusConfig} clickHandler={{userEdited, reloadDetailTransaction}} />
        </div>

        <div className="page-options-content">
          {
            optionList[0].isActive &&
            <TransactionForm
              configs={{transaction, mode}}
              clickHandler={{cancel: closeModal}}
            />
          }
          {
            optionList[1].isActive &&
            <TransactionDocumentForm
              configs={{transaction, documentType}}
              clickHandler={{updateCanComplete, userEdited, loadDocuments}}
            />
          }
          {
            optionList[2].isActive &&
            <Comment
              configs={{
                comments: comments,
                mode: 'edit',
                transactionId: transaction.id,
              }}
              clickHandler={{userEdited}}
            />
          }
        </div>

      </div>

      <div className="blur"/>
    </div>
  );
}

export default TransactionDetailModal;
