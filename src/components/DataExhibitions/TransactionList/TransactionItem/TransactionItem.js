import React from 'react';

import "./TransactionItem.scss"
import Status from "../../../Forms/Status/Status";
import Comment from "../../../Forms/Comment/Comment";

function TransactionItem(props) {
  let transaction = props.configs,
      {transaction_id, user_id, first_name, last_name,
        mls_id, transaction_required_count, address,
        state, city, zip_code, seller, buyer, price,
        start_date, end_date, status, comments} = transaction,
      isActionDisable = transaction.transaction_required_count === 47


  return (
    <div onClick={() => {props.clickHandler(transaction)}} className='transaction-item-container'>
      <div className="info-1">
        <p className="field" title={transaction_id}> <b>Transaction ID: </b>{transaction_id}</p>
        <p className="field" title={`${first_name}, ${last_name}`}> <b>Agent name: </b>{first_name} {last_name}</p>
        <p className="field" title={mls_id}> <b>MLS-ID: </b>{mls_id}</p>
        <p className="field" title={transaction_required_count}> <b>Documents: </b>{transaction_required_count}/47</p>
        <p className="field" title={`${address}, ${state}`}> <b>Address: </b>{address}, {state}</p>
        <p className="field hidden" title={`${city}, ${zip_code}`}> <b>Address: </b>{city}, {zip_code}</p>
      </div>

      <div className="info-2">
        <p className="field" title={seller}> <b>Seller: </b>{seller}</p>
        <p className="field" title={buyer}> <b>Buyer: </b>{buyer}</p>
        <p className="field" title={price}> <b>Price: </b>{price}</p>
        <p className="field" title={start_date}> <b>Start date: </b>{start_date}</p>
        <p className="field" title={end_date}> <b>End date: </b>{end_date}</p>
      </div>

      <div className="info-3">
        <Status configs={{activeStatus: status, mode: 'view', isActionDisable}}/>
        <Comment configs={{comments: comments, mode: 'view', transactionID: transaction_id, userID: user_id}}/>
      </div>
    </div>
  );
}

export default TransactionItem;
