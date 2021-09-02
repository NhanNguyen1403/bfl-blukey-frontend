import React, {useEffect} from 'react';

import "./ChangeDocumentForm.scss"
import generateInput from "../../../services/Generators/generateInput";
import {generateButton} from "../../../services/Generators/generateButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";

function ChangeDocumentForm(props) {
  let {save, cancel} = props.clickHandler
  let {doc} = props.configs


  let name = generateInput('Document Name', 'text', doc.name, 'full'),
      type = generateInput('Type', 'text', `${doc.isRequired ? 'Required' : 'Optional'}`, 'half', true, ['Required', 'Optional']),
      category = generateInput('Category', 'text', `${doc.isBoth ? 'Both' : doc.isListing ? 'Listing' : 'Buying'}`, 'half', true, ['Listing', 'Buying', 'Both']),
      saveButton = generateButton('Save', 'text', 'solid', 'md'),
      cancelButton = generateButton('Cancel', 'text', 'outlined', 'md')


  let validate = () => {
    let inputs = [name, type, category]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('Form Invalid')

    return save(doc.id, {
      name: name.getValue,
      isRequired: type.getValue === 'Required',
      isBoth: category.getValue === 'Both',
      isListing: category.getValue === 'Listing'
    })
  }


  return (
    <div className='change-document-form-container'>
      <div className="info-form-container">
        <div className="block">
          <Input configs={name}/>
          <Input configs={type}/>
          <Input configs={category}/>
        </div>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={() => cancel()}/>
      </div>
    </div>
  );
}

export default ChangeDocumentForm;
