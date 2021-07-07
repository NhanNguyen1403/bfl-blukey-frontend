import React, {useEffect, useState} from 'react';

import "./TransactionDetailModal.scss"
import PageOption from "../../Inputs/pageOption/pageOption";
import Button from "../../Inputs/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {generatePageOption} from "../../../services/Generators/generatePageOption";
import {generateButton} from "../../../services/Generators/generateButton";
import {hideTransactionDetail} from "../../../redux";
import Put from "../../../services/Api/PUT/put";
import getAll from "../../../services/Api/GET/getAll";
import Status from "../../Forms/Status/Status";
import TransactionForm from "../../Forms/TransactionForm/TransactionForm";
import TransactionDocumentForm from "../../Forms/TransactionDocumentForm/TransactionDocumentForm";
import Comment from "../../Forms/Comment/Comment";

function TransactionDetailModal(props) {
  let dispatch = useDispatch(),
      {isDisplay, mode, transaction} = useSelector(state => {
        return state.transactionDetail
      }),
      [optionList, setOptionList] = useState([]),
      closeButton = generateButton('close', 'icon', 'solid', 'md', 'close-icon'),
      isActionDisable = transaction.transaction_required_count === 47


  useEffect(() => {
    setOptionList([
      generatePageOption('Transaction', 'md', true),
      generatePageOption('Documents', 'md', false),
      generatePageOption('Comments', 'md', false),
    ])
  }, [mode])
  let changeOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.name, i.size, i.name === optionName)
    }))
  }
  let changePageOption = (optionName, andReload = false) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.name, i.size, i.name === optionName)
    }))

    // if (andReload)
    //   return loadData()
  }
  let closeModal = () => {
    dispatch(hideTransactionDetail())
  }
  let saveTransaction = async (id, payload) => {
    await Put('users', id, payload)
    let {data: getInfoResult} = await getAll('info')
    localStorage.setItem('user', JSON.stringify(getInfoResult))
    closeModal()
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
          <Status configs={{activeStatus: transaction.status, userID: transaction.user_id, mode: 'edit', isActionDisable}}/>
        </div>

        <div className="page-options-content">
          {
            optionList[0].isActive &&
            <TransactionForm
              configs={{transaction, mode}}
              clickHandler={{cancel: changePageOption}}
            />
          }
          {
            optionList[1].isActive &&
            <TransactionDocumentForm
              configs={{transaction, mode}}
            />
          }
          {
            optionList[2].isActive &&
            <Comment
              configs={{comments: transaction.comments, mode: 'edit', transactionID: transaction.id, userID: transaction.user_id}}
            />
          }
        </div>

      </div>

      <div className="blur"/>
    </div>
  );
}

export default TransactionDetailModal;
