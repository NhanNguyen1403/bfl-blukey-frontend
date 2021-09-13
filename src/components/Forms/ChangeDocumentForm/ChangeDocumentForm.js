import React, {useEffect} from 'react';

import "./ChangeDocumentForm.scss"
import gInput from "../../../services/Generators/gInput";
import {gButton} from "../../../services/Generators/gButton";
import Input from "../../Inputs/Input/Input";
import Button from "../../Inputs/Button/Button";
import gSelect from "../../../services/Generators/gSelect";
import Select from "../../Inputs/Select/Select";

function ChangeDocumentForm(props) {
  let {save, cancel} = props.clickHandler,
      {doc} = props.configs,
      name = gInput('Document Name', 'text', doc.name, 'full'),
      type = gSelect('Type', doc.isRequired, 'width__half',[
        {value: false, displayName: 'Optional'},
        {value: true, displayName: 'Required'}
      ]),
      category = gSelect('Category', doc.isBoth ? 'Both' : doc.isListing ? 'Listing' : 'Buying', 'width__half',[
        {value: 'Listing', displayName: 'Listing'},
        {value: 'Buying', displayName: 'Buying'},
        {value: 'Both', displayName: 'Both'},
      ]),
      saveButton = gButton('Save', 'text', 'solid', 'md'),
      cancelButton = gButton('Cancel', 'text', 'outlined', 'md')


  let validate = () => {
    let inputs = [name, type, category]
    if (inputs.some(i => i.getIsValid === false))
      return console.log('Form Invalid')

    return save(doc.id, {
      name: name.getValue,
      isRequired: type.value,
      isBoth: category.value === 'Both',
      isListing: category.value === 'Listing'
    })
  }


  return (
    <div className='change-document-form-container'>
      <div className="info-form-container">
        <div className="block">
          <Input configs={name}/>
          <Select configs={type}/>
          <Select configs={category}/>
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
