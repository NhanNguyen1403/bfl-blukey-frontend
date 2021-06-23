import React from 'react';

import "./TransactionList.scss"
import TransactionItem from "./TransactionItem/TransactionItem";
import Paging from "../Paging/Paging";
import TransactionFilter from "./TransactionFilter/TransactionFilter";

function TransactionList(props) {
  let {transactions, pageConfigs} = props.configs



  return (
    <div className='transaction-list-container'>
      <div className="filter-area">
        <TransactionFilter />
      </div>

      <div className="transaction-list-area">
        {
          transactions.map(i => {
            return (<TransactionItem key={i.transaction_id} configs={i}/>)
          })
        }
      </div>

      <div className="paging-area">
        <Paging configs={pageConfigs} clickHandler={props.clickHandler}/>
      </div>
    </div>
  );
}

export default TransactionList;
