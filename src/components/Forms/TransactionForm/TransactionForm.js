import React from 'react';

import "./TransactionForm.scss"
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import {generateInput} from "../../../services/Generators/generateInput";
import Post from "../../../services/Api/POST/post";
import Input from "../../Inputs/Input/Input";
import {showSnack} from "../../../redux";
import {useDispatch} from "react-redux";


function TransactionForm(props) {
  let dispatch = useDispatch(),
      {cancel} = props.clickHandler,
      {id, first_name, last_name} = JSON.parse(localStorage.getItem('user')),
      agentName = generateInput('Agent name', 'text', `${first_name} ${last_name}`, 'half',true,[], true),
      mlsID = generateInput('MLS-ID', 'text', '', 'half'),
      address = generateInput('Address', 'text', '', 'half'),
      city = generateInput('City', 'text', '', 'half'),
      state = generateInput('State', 'text', '', 'half'),
      zipCode = generateInput('Zip code', 'text', '', 'half'),
      buyer = generateInput('Buyer', 'text', '', 'half'),
      seller = generateInput('Seller', 'text', '', 'half'),
      price = generateInput('Price ($)', 'number', 0, 'half'),
      commissionRate = generateInput('Commission rate (%)', 'number', 0, 'half'),
      startDate = generateInput('Start date', 'date', '', 'half'),
      endDate = generateInput('End date', 'date', '', 'half'),
      createButton = generateButton('Create', 'text', 'solid', 'md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')



  let validate = () => {
    let inputs = [agentName,address,mlsID,seller,buyer,price,commissionRate,startDate,endDate]
    if (inputs.some(i => i.getIsValid === false))
      return console.log(false)

    if (startDate.getValue > endDate.getValue)
      return dispatch(showSnack('Start-date must before/same End date', 'danger'))

    return create({
      user_id: id,
      address: address.getValue,
      mls_id: mlsID.getValue,
      seller: seller.getValue,
      buyer: buyer.getValue,
      price: price.getValue,
      commission_rate: commissionRate.getValue,
      start_date: startDate.getValue,
      end_date: endDate.getValue,
    })
  }
  let create = async (payload) => {
    await Post('transactions', payload)
    cancel('Transactions', true)
  }



  return (
    <div className='transaction-form-container'>
      <div className="transaction-information-area">
        <p className="title">TRANSACTION INFORMATION</p>

        <div className="block">
          <Input configs={agentName}/>
          <Input configs={mlsID}/>
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


      <div className="button-area">
        <Button configs={createButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => cancel('Transactions')}/>
      </div>
    </div>
  );
}

export default TransactionForm;
