import React from 'react';

import "./TransactionItem.scss"
import Status from "../../../Forms/Status/Status";
import Comment from "../../../Forms/Comment/Comment";
import moment from "moment"

function TransactionItem(props) {
  let transaction = props.configs,
      { id, user, canComplete, mlsId, apn, totalDocumentUploadedRequired, totalDocumentRequired, address, state, city, zipCode,
        sellerName, buyerName, listingPrice, listingStartDate, listingEndDate, createdAt,
        transactionStatus, transactionComments
      } = transaction

  return (
    <div onClick={() => {props.clickHandler(transaction)}} className='transaction-item-container'>
      <div className="info-1">
        <p className="field" title={id}> <b>Transaction ID: </b>{id}</p>
        <p className="field" title={`${user.firstName}, ${user.lastName}`}> <b>Agent name: </b>{user.firstName} {user.lastName}</p>
        <p className="field" title={totalDocumentUploadedRequired}> <b>Documents: </b>{totalDocumentUploadedRequired}/{totalDocumentRequired}</p>
        <p className="field" title={`${address}, ${state}`}> <b>Address: </b>{address}, {state}</p>
        <p className="field hidden" title={`${city}, ${zipCode}`}> <b>Address: </b>{city}, {zipCode}</p>
        <p className="field" title={mlsId}> <b>MLS-ID: </b>{mlsId}</p>
        <p className="field" title={apn}> <b>APN: </b>{apn}</p>
      </div>

      <div className="info-2">
        <p className="field" title={sellerName}> <b>Seller: </b>{sellerName}</p>
        <p className="field" title={buyerName}> <b>Buyer: </b>{buyerName}</p>
        <p className="field" title={listingPrice}> <b>Price: </b>{listingPrice}</p>
        <p className="field" title={listingStartDate}> <b>Start date: </b>{moment(listingStartDate).format("MMM Do YY")}</p>
        <p className="field" title={listingEndDate}> <b>End date: </b>{moment(listingEndDate).format("MMM Do YY")}</p>
        <p className="field" title={createdAt}> <b>Created at: </b>{moment(createdAt).format("MMM Do YY")}</p>
      </div>

      <div className="info-3">
        <Status configs={{activeStatus: transactionStatus.name, mode: 'view', isActionDisable: !canComplete}} clickHandler={{userEdited: () => {}}}/>
        <Comment configs={{comments: transactionComments, mode: 'view', transactionId: id, userID: user.userId}} clickHandler={() => {}}/>
      </div>
    </div>
  );
}

export default TransactionItem;
