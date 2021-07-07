import React from 'react';

import "./CommentActionForm.scss"
import {generateInput} from "../../../../services/Generators/generateInput";
import {generateButton} from "../../../../services/Generators/generateButton";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";

function CommentActionForm(props) {
  let {comment, isDisplay} = props.configs,
      closeActionForm = props.clickHandler,
      commentInput = generateInput('Edit','text',comment.message,'full', false),
      saveButton = generateButton('Save change','text', 'solid', 'sm'),
      cancelButton = generateButton('Cancel','text', 'outlined', 'sm')


  let validate = () => {
    console.log('validate new new message')
  }

  return (
    isDisplay && <div className={`comment-action-form-container`}>
      <div className="edit-comment-area">
        <Input configs={commentInput}/>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={closeActionForm}/>
        <Button configs={cancelButton} clickHandler={closeActionForm}/>
      </div>
    </div>
  );
}

export default CommentActionForm;
