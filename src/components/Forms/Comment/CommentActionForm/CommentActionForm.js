import React, {useState} from 'react';

import "./CommentActionForm.scss"
import { gButton } from "../../../../services/Generators/gButton";
import Button from "../../../Inputs/Button/Button";


function CommentActionForm(props) {
  let { comment, isDisplay } = props.configs,
    { editComment, deleteComment, toggleActionForm } = props.clickHandler,
    [inputComment, setInputComment] = useState(comment.comment),
    saveButton = gButton('Save change', 'text', 'solid', 'sm'),
    buttonCancel = gButton('Cancel', 'text', 'outlined', 'sm'),
    deleteButton = gButton('Delete', 'text', 'outlined warning', 'sm')

  let validate = async () => {
    console.log('validate new new message')
    if (inputComment.length === 0) return

    await editComment(comment.id, inputComment)
    toggleActionForm()
  }
  let confirmDelete = () => {
    deleteComment(comment.id)
  }

  return (
    isDisplay && <div className={`comment-action-form-container`}>
      <div className="edit-comment-area">
        <textarea
          name="message"
          id="message"
          placeholder="Leave a comment here."
          rows='5'
          value={inputComment}
          onChange={e => setInputComment(e.target.value)}>
        </textarea>
      </div>

      <div className="button-area">
        <Button configs={saveButton} clickHandler={validate} />
        <Button configs={buttonCancel} clickHandler={toggleActionForm} />
        <Button configs={deleteButton} clickHandler={confirmDelete} />
      </div>
    </div>
  );
}

export default CommentActionForm;
