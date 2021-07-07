import React, {useEffect, useState} from 'react';

import "./TransactionForm.scss"
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import {generateInput} from "../../../services/Generators/generateInput";
import Post from "../../../services/Api/POST/post";
import Input from "../../Inputs/Input/Input";
import {showSnack} from "../../../redux";
import {useDispatch} from "react-redux";
import Put from "../../../services/Api/PUT/put";


function TransactionForm(props) {
  let dispatch = useDispatch(),
    {transaction, mode} = props.configs,
    {cancel} = props.clickHandler,
    {id, first_name, last_name} = JSON.parse(localStorage.getItem('user')),
    [agentName, setAgentName] = useState(generateInput('Agent name', 'text', '', 'half', true, [], true)),
    mlsID = generateInput('MLS-ID', 'text', `${transaction?.mls_id || ''}`, 'half', true, [], mode === 'view'),
    apn = generateInput('Apn', 'text', `${transaction?.apn || ''}`, 'half', true, [], mode === 'view'),
    address = generateInput('Address', 'text', `${transaction?.address || ''}`, 'half', true, [], mode === 'view'),
    city = generateInput('City', 'text', `${transaction?.city || ''}`, 'half', true, [], mode === 'view'),
    state = generateInput('State', 'text', `${transaction?.state || ''}`, 'half', true, [], mode === 'view'),
    zipCode = generateInput('Zip code', 'text', `${transaction?.zip_code || ''}`, 'half', true, [], mode === 'view'),
    buyer = generateInput('Buyer', 'text', `${transaction?.buyer || ''}`, 'half', true, [], mode === 'view'),
    seller = generateInput('Seller', 'text', `${transaction?.seller || ''}`, 'half', true, [], mode === 'view'),
    price = generateInput('Price ($)', 'number', `${transaction?.price || 0}`, 'half', true, [], mode === 'view'),
    commissionRate = generateInput('Commission rate (%)', 'number', `${transaction?.commission_rate || 0}`, 'half', true, [], mode === 'view'),
    startDate = generateInput('Start date', 'date', `${transaction?.start_date || ''}`, 'half', true, [], mode === 'view'),
    endDate = generateInput('End date', 'date', `${transaction?.end_date || ''}`, 'half', true, [], mode === 'view'),
    createButton = generateButton(`${mode === 'edit' ? 'Save' : 'Create'}`, 'text', 'solid', 'md'),
    cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')


  useEffect(() => {
    if (transaction.first_name && transaction.last_name)
      setAgentName(generateInput('Agent name', 'text', `${transaction.first_name} ${transaction.last_name}`, 'half', true, [], true))
    else
      setAgentName(generateInput('Agent name', 'text', `${first_name} ${last_name}`, 'half', true, [], true))
  }, [])

  let validate = () => {
    let inputs = [agentName, address, mlsID, seller, buyer, price, commissionRate, startDate, endDate]
    if (inputs.some(i => i.getIsValid === false))
      return console.log(false)

    if (startDate.getValue > endDate.getValue)
      return dispatch(showSnack('Start-date must before/same End date', 'danger'))

    let payload = {
      user_id: id,
      address: address.getValue,
      mls_id: mlsID.getValue,
      seller: seller.getValue,
      buyer: buyer.getValue,
      price: price.getValue,
      commission_rate: commissionRate.getValue,
      start_date: startDate.getValue,
      end_date: endDate.getValue,
    }

    if (mode === 'create')
      return create(payload)
    return save(payload)
  }
  let create = async (payload) => {
    await Post('transactions', payload)
    cancel('Transactions', true)
  }
  let save = async (payload) => {
    await Put('transactions', payload)
    cancel('Transactions', true)
  }


  return (
    <div className='transaction-form-container'>
      <div className="blocks">
        <div className="transaction-information-area">
          <p className="title">TRANSACTION INFORMATION</p>

          <div className="block">
            <Input configs={agentName}/>
            <Input configs={mlsID}/>
            <Input configs={apn}/>
          </div>

          <div className="block">
            <Input configs={address}/>
            <Input configs={city}/>
            <Input configs={state}/>
            <Input configs={zipCode}/>
          </div>

          <div className="block">
            <Input configs={seller}/>
            <Input configs={buyer}/>
            <Input configs={price}/>
            <Input configs={commissionRate}/>
            <Input configs={startDate}/>
            <Input configs={endDate}/>
          </div>
        </div>

        {
          mode !== "view" &&
          <div className="button-area">
            <Button configs={createButton} clickHandler={validate}/>
            <Button configs={cancelButton} clickHandler={() => cancel('Transactions')}/>
          </div>
        }
      </div>
    </div>
  );
}

export default TransactionForm;
