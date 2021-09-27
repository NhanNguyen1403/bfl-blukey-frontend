import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideTransactionDetail, needReload} from "../../../redux";

import "./TransactionDetailModal.scss"
import Button from "../../Inputs/Button/Button";
import PageOption from "../../Inputs/pageOption/pageOption";
// import Put from "../../../services/Api/PUT/put";
// import getAll from "../../../services/Api/GET/getAll";
import getAll from "../../../services/Api/GET/getAll";
import getUnit from "../../../services/Api/GET/getUnit";
import {gButton} from "../../../services/Generators/gButton";
import {gPageOption} from "../../../services/Generators/gPageOption";
import Status from "../../Forms/Status/Status";
import Comment from "../../Forms/Comment/Comment";
import TransactionForm from "../../Forms/TransactionForm/TransactionForm";
import TransactionDocumentFormV2 from '../../Forms/TransactionDocumentForm/TransactionDocumentFormV2';

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
        gPageOption('','Transaction', 'md', true),
        gPageOption('','Documents', 'md', false),
        gPageOption('','Comments', 'md', false),
      ]),
      [statusConfig, setStatusConfig] = useState({}),
      [documentType, setDocumentType] = useState({}),
      [isUserEdited, setIsUserEdited] = useState(false),
      closeButton = gButton('close', 'icon', 'solid', 'md', 'close-icon')



  useEffect(() => {
    setTransaction(transactionDetail)
  }, [transactionDetail])
  useEffect(() => {
    setMode(initMode)
  }, [initMode])
  useEffect( () => {
    async function loadData () {
      await loadDocuments()
      setComments(transaction.comments)
    } 
    loadData()
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
      return gPageOption(i.path, i.name, i.size, i.name === optionName)
    }))
  }
  let loadDocuments = async () => {
    if (transaction && transaction.id) {
      let {data} = await getAll(`documentTypes/transactions/${transaction.id}`)
      setCanComplete(data.canComplete)
      setDocumentType(data)
    }
  }
  let closeModal = () => {
    dispatch(hideTransactionDetail())
    setOptionList([
      gPageOption(undefined,'Transaction', 'md', true),
      gPageOption(undefined,'Documents', 'md', false),
      gPageOption(undefined,'Comments', 'md', false),
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
            <TransactionDocumentFormV2
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
