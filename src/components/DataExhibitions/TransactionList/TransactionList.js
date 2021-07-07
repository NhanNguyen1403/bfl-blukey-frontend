import React from 'react';

import "./TransactionList.scss"
import TransactionItem from "./TransactionItem/TransactionItem";
import Paging from "../Paging/Paging";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
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
    let {is_admin, id} = JSON.parse(localStorage.getItem('user')),
        status = transaction.status

    // user + new/in-progress/error -> edit
    if ((!is_admin || (is_admin && id === transaction.user_id)) && (status === 'new' || status === 'in progress' || status === 'error'))
      return true

    // the rest are view
    return false
  }

  return (
    <div className='transaction-list-container'>
      <div className="filter-area">
        <TransactionFilter clickHandler={props.clickHandler}/>
      </div>

      <div className="transaction-list-area">
        {
          transactions.map(i => {
            return (<TransactionItem key={i.transaction_id} configs={i} clickHandler={showDetailModal}/>)
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
