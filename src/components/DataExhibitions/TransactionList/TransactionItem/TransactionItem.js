import React from 'react';

import "./TransactionItem.scss"
import Status from "../../../Forms/Status/Status";
import Comment from "../../../Forms/Comment/Comment";

function TransactionItem(props) {
  let transaction = props.configs,
      isActionDisable = transaction.transaction_required_count === 47


  return (
    <div className='transaction-item-container'>
      <div className="info-1">
        <p className="field" title={transaction.transaction_id}> <b>Transaction ID: </b>{transaction.transaction_id}</p>
        <p className="field" title={transaction.agentName}> <b>Agent name: </b>{transaction.agentName}</p>
        <p className="field" title={transaction.mls_id}> <b>MLS-ID: </b>{transaction.mls_id}</p>
        <p className="field" title={transaction.transaction_required_count}> <b>Documents: </b>{transaction.transaction_required_count}/47</p>
        <p className="field" title={`${transaction.address}, ${transaction.state}`}> <b>Address: </b>{transaction.address}, {transaction.state}</p>
        <p className="field hidden" title={`${transaction.city}, ${transaction.zip_code}`}> <b>Address: </b>{transaction.city}, {transaction.zip_code}</p>
      </div>

      <div className="info-2">
        <p className="field" title={transaction.seller}> <b>Seller: </b>{transaction.seller}</p>
        <p className="field" title={transaction.buyer}> <b>Buyer: </b>{transaction.buyer}</p>
        <p className="field" title={transaction.price}> <b>Price: </b>{transaction.price}</p>
        <p className="field" title={transaction.start_date}> <b>Start date: </b>{transaction.start_date}</p>
        <p className="field" title={transaction.end_date}> <b>End date: </b>{transaction.end_date}</p>
      </div>

      <div className="info-3">
        <Status configs={{activeStatus: transaction.status, mode: 'view', isActionDisable}}/>
        <Comment configs={{comments: transaction.comments, mode: 'view', transactionID: transaction.transaction_id}}/>
      </div>
    </div>
  );
}

export default TransactionItem;
