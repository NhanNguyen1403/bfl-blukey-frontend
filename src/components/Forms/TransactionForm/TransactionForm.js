import React, {useEffect, useState} from 'react';

import "./TransactionForm.scss"

import {showSnack} from "../../../redux";
import {needReload} from "../../../redux";
import {useDispatch} from "react-redux";

import Button from "../../Inputs/Button/Button";
import {gButton} from "../../../services/Generators/gButton";
import Input from "../../Inputs/Input/Input";
import gInput from "../../../services/Generators/gInput";
import Select from "../../Inputs/Select/Select";
import gSelect from "../../../services/Generators/gSelect";
import Post from "../../../services/Api/POST/post";
import Put from "../../../services/Api/PUT/put";
import {useHistory} from "react-router-dom";

function TransactionForm(props) {
  let dispatch = useDispatch(),
    {transaction, mode} = props.configs,
    {cancel} = props.clickHandler,
    {firstName, lastName} = JSON.parse(localStorage.getItem('user')),
    [agentName, setAgentName] = useState(gInput('Agent name', 'text', '', 'half', true, [], true)),
    mlsID     = gInput('MLS-ID', 'text', `${transaction?.mlsId || ''}`, 'half', true, [], mode === 'view'),
    apn       = gInput('Apn', 'text', `${transaction?.apn || ''}`, 'half', false, [], mode === 'view'),
    address   = gInput('Address', 'text', `${transaction?.address || ''}`, 'half', true, [], mode === 'view'),
    city      = gInput('City', 'text', `${transaction?.city || ''}`, 'half', true, [], mode === 'view'),
    state     = gInput('State', 'text', `${transaction?.state || ''}`, 'half', true, [], mode === 'view'),
    zipCode   = gInput('Zip code', 'text', `${transaction?.zipCode || ''}`, 'half', true, [], mode === 'view'),
    buyer     = gInput('Buyer', 'text', `${transaction?.buyerName || ''}`, 'half', true, [], mode === 'view'),
    seller    = gInput('Seller', 'text', `${transaction?.sellerName || ''}`, 'half', true, [], mode === 'view'),
    price     = gInput('Price ($)', 'number', `${transaction?.listingPrice || null}`, 'half', true, [], mode === 'view'),
    commissionRate = gInput('Commission ($)', 'number', `${transaction?.commissionAmount || null}`, 'half', true, [], mode === 'view'),
    startDate = gInput('Start date', 'date', `${transaction?.listingStartDate || ''}`, 'half', true, [], mode === 'view'),
    endDate   = gInput('End date', 'date', `${transaction?.listingEndDate || ''}`, 'half', true, [], mode === 'view'),
    type      = gSelect('Type', transaction?.isListing, 'width__half', [
      {value: false, displayName: 'Buying'},
      {value: true, displayName: 'Listing'},
    ], true, transaction.id ? true : false),
    buttonCreate = gButton(`${mode === 'edit' ? 'Save' : 'Create'}`, 'text', 'solid', 'md'),
    buttonCancel = gButton('Cancel', 'text', 'outlined', 'md'),
    history = useHistory()


  useEffect(() => {
    if (transaction?.user?.firstName && transaction?.user?.lastName)
      setAgentName(gInput('Agent name', 'text', `${transaction.user.firstName} ${transaction.user.lastName}`, 'half', true, [], true))
    else
      setAgentName(gInput('Agent name', 'text', `${firstName} ${lastName}`, 'half', true, [], true))
  }, [transaction])

  let validate = () => {
    let inputs = [agentName, address, mlsID, seller, buyer, price, commissionRate, startDate, endDate]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('Form Invalid')

    if (startDate.getValue > endDate.getValue)
      return dispatch(showSnack('Start-date must before/same End date', 'danger'))

    let payload = {
      address: address.getValue,
      city: city.getValue,
      state: state.getValue,
      zipCode: zipCode.getValue,
      mlsId: mlsID.getValue,
      isListing: type.value || false,
      listingPrice: price.getValue,
      commissionAmount: commissionRate.getValue,
      sellerName: seller.getValue,
      buyerName: buyer.getValue,
      listingStartDate: startDate.getValue,
      listingEndDate: endDate.getValue,
    }

    if (apn.getValue.length !== 0)
      payload.apn = apn.getValue
    
    if (mode === 'create')
      return create(payload)
    return save(payload)
  }
  let create = async (payload) => {
    await Post('transactions', payload)
    closeForm(true)
  }
  let save = async (payload) => {
    await Put('transactions', transaction.id, payload)
    closeForm(true)
  }
  let closeForm = (requrestReload = false) => {
    history.push("/transactions")
    cancel('Transactions')

    if (requrestReload)
      dispatch(needReload())
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
            <Select configs={type}/>
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
            <Button configs={buttonCancel} clickHandler={() => closeForm()}/>
            <Button configs={buttonCreate} clickHandler={validate}/>
          </div>
        }
      </div>
    </div>
  );
}

export default TransactionForm;
