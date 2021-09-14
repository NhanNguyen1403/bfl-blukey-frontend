import React from 'react';

import "./CreateDocumentForm.scss"
import Input from "../../Inputs/Input/Input";
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Button from "../../Inputs/Button/Button";
import Post from '../../../services/Api/POST/post'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {needReload} from "../../../redux";
import gSelect from "../../../services/Generators/gSelect";
import Select from "../../Inputs/Select/Select";

function CreateDocumentForm(props) {
  let {cancel} = props.clickHandler
  let name = gInput('Document Name', 'text', '', 'full'),
      type = gSelect('Type', false, 'width__half',[
        {value: false, displayName: 'Optional'},
        {value: true, displayName: 'Required'}
      ]),
      category = gSelect('Category', 'Listing', 'width__half',[
        {value: 'Listing', displayName: 'Listing'},
        {value: 'Buying', displayName: 'Buying'},
        {value: 'Both', displayName: 'Both'},
      ]),
      createButton = gButton('Create', 'text', 'solid','md'),
      cancelButton = gButton('Cancel', 'text', 'outlined', 'md'),
      history = useHistory(),
      dispatch = useDispatch()

  let validate = () => {
    let inputs = [name, type, category]

    if (inputs.some(i => i.getIsValid === false))
      return console.log('Form Invalid')

    return create({
      name: name.getValue,
      isRequired: type.value,
      isBoth: category.value === 'Both',
      isListing: category.value === 'Listing'
    })
  }

  let create = async (payload) => {
    await Post('documentTypes', payload)
    closeForm(true)
  }
  let closeForm = (requestReload = false) => {
    cancel('Documents')
    history.push("/documents")

    if (requestReload)
      dispatch(needReload())
  }

  return (
    <div className='create-document-form'>
      <div className="info-form-container">
        {/*<p className="title">INFORMATION</p>*/}

        <div className="block">
          <Input configs={name}/>
          <Select configs={type}/>
          <Select configs={category}/>
        </div>
      </div>

      <div className="button-area">
        <Button configs={createButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => closeForm()}/>
      </div>
    </div>
  );
}

export default CreateDocumentForm
