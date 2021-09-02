import React, {useEffect, useState} from 'react';

import "./DocumentModal.scss"
import {useDispatch, useSelector} from "react-redux";
import Button from "../../Inputs/Button/Button";
import PageOption from "../../Inputs/pageOption/pageOption";
import {hideDocumentModal} from "../../../redux";
import {needReload} from "../../../redux";
import Put from "../../../services/Api/PUT/put"
import {generateButton} from "../../../services/Generators/generateButton";
import ChangeDocumentForm from "../../Forms/ChangeDocumentForm/ChangeDocumentForm";
import {generatePageOption} from "../../../services/Generators/generatePageOption";

function DocumentModal(props) {
  let dispatch = useDispatch(),
      {isDisplay, doc} = useSelector(state => {
        return state.documentModal
      }),
      [optionList, setOptionList] = useState([
        generatePageOption(undefined,'Document', 'md', true)
      ]),
      closeButton = generateButton('close', 'icon', 'solid', 'md', 'close-icon')


  let closeModal = () => {
    dispatch(hideDocumentModal())
    setOptionList([
      generatePageOption(undefined,'Document', 'md', true),
    ])
  }
  let changeOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.path, i.name, i.size, i.name === optionName)
    }))
  }
  let saveDocument = async (id, payload) => {
    await Put(`documentTypes`, id, payload)

    dispatch(needReload())
    closeModal()
  }


  return (
    isDisplay && <div className="document-modal-container">
      <div className="modal-content">
        <div className="options-area">
          {
            optionList.map(i => {
              return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changeOption}/>)
            })
          }
          <div className="button-area">
            <Button configs={closeButton} clickHandler={closeModal}/>
          </div>
        </div>

        {
          optionList[0].isActive &&
          <ChangeDocumentForm configs={{doc}} clickHandler={{save: saveDocument, cancel: closeModal}}/>
        }
      </div>

      <div className="blur"/>
    </div>
  );
}

export default DocumentModal;
