import React from 'react';

import "./CommentActionForm.scss"
import gInput from "../../../../services/Generators/gInput";
import {gButton} from "../../../../services/Generators/gButton";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";

function CommentActionForm(props) {
  let {comment, isDisplay} = props.configs,
      {editComment, deleteComment, toggleActionForm} = props.clickHandler,
      commentInput = gInput('Edit','text',comment.comment,'full', false),
      saveButton = gButton('Save change','text', 'solid', 'sm'),
      cancelButton = gButton('Cancel','text', 'outlined', 'sm'),
      deleteButton = gButton('Delete', 'text', 'outlined warning', 'sm')

  let validate = async () => {
    console.log('validate new new message')
    if (!commentInput.isValid) return

    await editComment(comment.id, commentInput.getValue)
    toggleActionForm()
  }
  let confirmDelete = () => {
    deleteComment(comment.id)
  }

  return (
    isDisplay && <div className={`comment-action-form-container`}>
      <div className="edit-comment-area">
        <Input configs={commentInput}/>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={validate}/>
        <Button configs={cancelButton} clickHandler={toggleActionForm}/>
        <Button configs={deleteButton} clickHandler={confirmDelete}/>
      </div>
    </div>
  );
}

export default CommentActionForm;
