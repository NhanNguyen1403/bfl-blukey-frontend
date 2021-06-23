import React, {useEffect, useState} from 'react';

import "./TransactionFilter.scss"
import {generateInput} from "../../../../services/Generators/generateInput";
import Input from "../../../Inputs/Input/Input";
import {generateButton} from "../../../../services/Generators/generateButton";
import Button from "../../../Inputs/Button/Button";

function TransactionFilter(props) {
  let transactionID = generateInput('Transaction ID','text','', 'sm',false),
      startDate = generateInput('Start date','date','','sm', false),
      endDate = generateInput('End date','date','','sm', false),
      [agentName, setAgentName] = useState(generateInput('Agent name','text','','sm', false, [])),
      [status, setStatus] = useState(generateInput('Status', 'text', '', 'sm', false, [])),
      filterButton = generateButton('Filter', 'icon', 'square', 'md', 'filter-icon')


  useEffect(() => {
    loadAgentNames()
    loadStatuses()
  },[])

  let loadAgentNames = async () => {
    // load agent names
    let agents = ['Lam', 'Nathan', 'Nhan'],
        {labelName, type, value, size, isRequired} = agentName

    setAgentName(generateInput(labelName, type, value, size, isRequired, agents))
  }
  let loadStatuses = async () => {
    // load statuses
    let statuses = ['NEW', 'IN PROGRESS', 'REVIEW', 'COMPLETE', 'ERROR'],
        {labelName, type, value, size, isRequired} = status

    setStatus(generateInput(labelName, type, value, size, isRequired, statuses))
  }
  let validate = () => {
    console.log('Validate filter')
  }

  return (
    <div className='transaction-filter-container'>
      <Input configs={transactionID}/>
      <Input configs={startDate}/>
      <Input configs={endDate}/>
      <Input configs={agentName}/>
      <Input configs={status}/>

      <div className="button-area">
        <Button configs={filterButton} clickHandler={validate}/>
      </div>
    </div>
  );
}

export default TransactionFilter;
