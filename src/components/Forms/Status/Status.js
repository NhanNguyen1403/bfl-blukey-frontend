import React, {useEffect, useState} from 'react';

import "./Status.scss"
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import Put from "../../../services/Api/PUT/put";

function Status(props) {
  let {transactionId, activeStatus, userId, mode, isActionDisable} = props.configs,
      {userEdited, reloadDetailTransaction} = props.clickHandler,
      statuses = ['new', 'in progress', 'review', 'complete', 'error'],
      inProgressButton = generateButton('In progress', 'text', 'solid', 'sm'),
      [reviewButton, setReviewButton] = useState(generateButton('Request review', 'text', 'solid disable', 'sm')),
      approveButton = generateButton('Approve', 'text', 'solid', 'sm'),
      rejectButton = generateButton('Reject', 'text', 'outlined warning', 'sm'),
      {isAdmin, id} = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!isActionDisable)
      setReviewButton(generateButton('Request review', 'text', 'solid', 'sm'))
    else
      setReviewButton(generateButton('Request review', 'text', 'solid disable', 'sm'))

  }, [isActionDisable])


  let updateStatus = async (statusName) => {
    let payload = {status: getStatusId(statusName)}

    await Put('transactions/status', transactionId, payload)
    userEdited()
    reloadDetailTransaction()
  }

  let getStatusId = (statusName) => {
    let statusIds = {
        new: 1,
        "in progress": 2,
        review: 3,
        complete: 4,
        error: 5
      }
    return statusIds[statusName]
  }

  let isStatusEqual = (targetStatus) => {
    if (!activeStatus) return false

    return activeStatus.toLowerCase() === targetStatus
  }



  return (
    <div className={`status-container ${mode}`}>
      {mode === 'edit' && <p className="title">STATUS</p>}

      <div title={isActionDisable ? 'You need to to upload 47 required documents' : ''}  className="status-area">
        {
          statuses.map(i => {
            return <span key={i} className={`status ${isStatusEqual(i) ? i.replace(' ', ''): ''}`}>{i}</span>
          })
        }
      </div>

      {
        mode === 'edit' &&
        <div title={isStatusEqual('in progress') ? 'You need to upload 47 required documents to request view' : ''} className="button-area">
          {
            (!isAdmin || (isAdmin && userId === id)) &&
            (isStatusEqual('new') || isStatusEqual('error')) &&
            <Button configs={inProgressButton} clickHandler={() => updateStatus('in progress')}/>
          }
          {(!isAdmin || (isAdmin && userId === id)) && isStatusEqual('in progress') && <Button configs={reviewButton} clickHandler={() => updateStatus('review')}/>}
          {isAdmin && isStatusEqual('review') && <Button configs={approveButton} clickHandler={() => updateStatus('complete')}/>}
          {isAdmin && isStatusEqual('review') && <Button configs={rejectButton} clickHandler={() => updateStatus('error')}/>}
        </div>
      }
    </div>
  );
}

export default Status;
