import React from 'react';

import "./TransactionList.scss"
import TransactionItem from "./TransactionItem/TransactionItem";
import Paging from "../Paging/Paging";
import TransactionDetailModal from "../../Modals/TransactionDetailModal/TransactionDetailModal";
import {useDispatch} from "react-redux";
import {showTransactionDetail} from "../../../redux";


function TransactionList(props) {
  let {transactions, pageConfigs} = props.configs,
      dispatch = useDispatch()


  let showDetailModal = (transaction) => {
    let editMode = isEdit(transaction)
    dispatch(showTransactionDetail(`${editMode ? 'edit' : 'view'}`, transaction))
  }

  let isEdit = (transaction) => {
    let {isAdmin, id} = JSON.parse(localStorage.getItem('user')),
        {transactionStatus} = transaction,
        status = transactionStatus.name.toLowerCase()

    // user + new/in-progress/error -> edit
    if ((!isAdmin || (isAdmin && id === transaction.user.id)) &&
      (status === 'new' || status === 'in progress'))
      return true

    // the rest are view
    return false
  }


  return (
    <div className='transaction-list-container'>
      <div className="transaction-list-area">
        {
          transactions.map(i => {
            return (<TransactionItem key={i.id} configs={i} clickHandler={showDetailModal}/>)
          })
        }
      </div>

      <div className="paging-area">
        <Paging configs={pageConfigs} clickHandler={props.clickHandler}/>
      </div>

      <TransactionDetailModal />
    </div>
  );
}

export default TransactionList;
