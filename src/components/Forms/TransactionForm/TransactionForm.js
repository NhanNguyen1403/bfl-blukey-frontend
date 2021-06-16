import React from 'react';

import "./TransactionForm.scss"
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import {generateInput} from "../../../services/Generators/generateInput";
import Post from "../../../services/Api/POST/post";
import Input from "../../Inputs/Input/Input";

function TransactionForm(props) {
  let {cancel} = props.clickHandler,
      agentName = generateInput('Agent Name', 'text', '', 'one-third'),
      address = generateInput('Address', 'text', '', 'one-third'),
      mlsID = generateInput('MLS-ID', 'text', '', 'one-third'),
      seller = generateInput('Seller', 'text', '', 'one-third'),
      buyer = generateInput('Buyer', 'text', '', 'one-third'),
      price = generateInput('Price', 'number', '', 'one-third'),
      commissionRate = generateInput('Commission Rate', 'number', '', 'one-third'),
      startDate = generateInput('Start Date', 'date', '', 'one-third'),
      endDate = generateInput('Start Date', 'date', '', 'one-third'),
      createButton = generateButton('Create', 'text', 'solid', 'md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')



  let validate = () => {
    let inputs = [agentName,address,mlsID,seller,buyer,price,commissionRate,startDate,endDate]
    if (inputs.some(i => i.getIsValid === false))
      return console.log(false)

    return create({
      agentName: agentName.getValue,
      address: address.getValue,
      mlsID: mlsID.getValue,
      seller: seller.getValue,
      buyer: buyer.getValue,
      price: price.getValue,
      commissionRate: commissionRate.getValue,
      startDate: startDate.getValue,
      endDate: endDate.getValue,
    })
  }
  let create = async (payload) => {
    await Post('transactions', payload)
    cancel('Transactions', true)
  }



  return (
    <div className='transaction-form-container'>
      <div className="agent-area">
        <p className="title">AGENT</p>

        <Input configs={agentName}/>
        <Input configs={address}/>
        <Input configs={mlsID}/>
      </div>


      <div className="property-area">
        <p className="title">PROPERTY</p>

        <Input configs={seller}/>
        <Input configs={price}/>
        <Input configs={startDate}/>

        <Input configs={buyer}/>
        <Input configs={commissionRate}/>
        <Input configs={endDate}/>
      </div>


      <div className="button-area">
        <Button configs={createButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => cancel('Transactions')}/>
      </div>
    </div>
  );
}

export default TransactionForm;
