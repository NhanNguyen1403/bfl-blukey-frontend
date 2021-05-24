import React, {useState} from 'react';

import "./ProfileModal.scss"
import {useDispatch, useSelector} from "react-redux";
import {generatePageOption} from "../../../services/Generators/generatePageOption";
import PageOption from "../../Forms/pageOption/pageOption";
import Button from "../../Inputs/Button/Button";
import {generateButton} from "../../../services/Generators/generateButton";
import {hideProfileModal} from "../../../redux";
import ChangeProfileForm from "../../Forms/changeProfileForm/changeProfileForm";
import ChangePasswordForm from "../../Forms/changePasswordForm/changePasswordForm";

function ProfileModal(props) {
  const {isDisplay} = useSelector(state => {
    return state.profileModal
  })
  let dispatch = useDispatch()
  let [optionList, setOptionList] = useState([
    generatePageOption('Profile', 'md', true),
    generatePageOption('Password', 'md', false),
  ])
  let closeButton = generateButton('close', 'icon', 'solid', 'md', 'close-icon')

  let closeModal = () => {
    dispatch(hideProfileModal())
  }
  let changeOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.name, i.size, i.name === optionName)
    }))
  }

  const saveProfile = (payload) => {
    console.log('Save Profile', payload)
  }

  const savePassword = (payload) => {
    console.log('Save Password', payload)
  }

  return (
    isDisplay && <div className="profile-modal-container">
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
          optionList[0].isActive
            ? <ChangeProfileForm clickHandler={{save: saveProfile, cancel: closeModal}}/>
            : <ChangePasswordForm clickHandler={{save: savePassword, cancel: closeModal}}/>
        }
      </div>

      <div className="blur"/>
    </div>
  );
}

export default ProfileModal;
