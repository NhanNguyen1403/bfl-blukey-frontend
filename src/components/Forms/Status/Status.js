import React, {useEffect, useState} from 'react';

import "./Status.scss"
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";

function Status(props) {
  let {activeStatus, userID, mode, isActionDisable} = props.configs,
      statuses = ['new', 'in progress', 'review', 'complete', 'error'],
      inProgressButton = generateButton('In progress', 'text', 'solid', 'sm'),
      [reviewButton, setReviewButton] = useState(generateButton('Request review', 'text', 'solid disable', 'sm')),
      approveButton = generateButton('Approve', 'text', 'solid', 'sm'),
      rejectButton = generateButton('Reject', 'text', 'outlined warning', 'sm'),
      {is_admin, id} = JSON.parse(localStorage.getItem('user'))


  useEffect(() => {
    if (isActionDisable)
      setReviewButton = generateButton('Request review', 'text', 'solid', 'sm')
  }, [])


  let updateStatus = (status) => {
    console.log('Change Status to', status)
  }



  return (
    <div className={`status-container ${mode}`}>
      {mode === 'edit' && <p className="title">STATUS</p>}

      <div title={isActionDisable ? 'You need to to upload 47 required documents' : ''}  className="status-area">
        {
          statuses.map(i => {
            return <span key={i} className={`status ${i === activeStatus ? activeStatus.replace(' ', ''): ''}`}>{i}</span>
          })
        }
      </div>

      {
        mode === 'edit' &&
        <div title={activeStatus === 'in progress' ? 'You need to upload 47 required documents to request view' : ''} className="button-area">
          {
            (!is_admin || (is_admin && userID === id)) &&
            (activeStatus === 'new' || activeStatus === 'error') &&
            <Button configs={inProgressButton} clickHandler={() => updateStatus('in progress')}/>
          }
          {(!is_admin || (is_admin && userID === id)) && activeStatus === 'in progress' && <Button configs={reviewButton} clickHandler={() => updateStatus('request review')}/>}
          {is_admin && activeStatus === 'review' && <Button configs={approveButton} clickHandler={() => updateStatus('complete')}/>}
          {is_admin && activeStatus === 'review' && <Button configs={rejectButton} clickHandler={() => updateStatus('error')}/>}
        </div>
      }
    </div>
  );
}

export default Status;
