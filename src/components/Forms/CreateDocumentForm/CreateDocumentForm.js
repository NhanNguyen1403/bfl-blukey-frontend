import React from 'react';

import "./CreateDocumentForm.scss"
import Input from "../../Inputs/Input/Input";
import generateInput from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import Post from '../../../services/Api/POST/post'
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {needReload} from "../../../redux";

function CreateDocumentForm(props) {
  let {cancel} = props.clickHandler
  let name = generateInput('Document Name', 'text', '', 'full'),
      type = generateInput('Type', 'text', '', 'half', true, ['Required', 'Optional']),
      category = generateInput('Category', 'text', '', 'half', true, ['Listing', 'Buying', 'Both']),
      createButton = generateButton('Create', 'text', 'solid','md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md'),
      history = useHistory(),
      dispatch = useDispatch()

  let validate = () => {
    let inputs = [name, type, category]

    if (inputs.some(i => i.getIsValid === false))
      return console.log('Form Invalid')

    return create({
      name: name.getValue,
      isRequired: type.getValue === 'Required',
      isBoth: category.getValue === 'Both',
      isListing: category.getValue === 'Listing'
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
          <Input configs={type}/>
          <Input configs={category}/>
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
