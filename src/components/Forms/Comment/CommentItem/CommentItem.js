import React, {useState} from 'react';

import "./CommentItem.scss"
import CommentActionForm from "../CommentActionForm/CommentActionForm";

function CommentItem(props) {
  let {comment, mode} = props.configs,
      {id: userId} = JSON.parse(localStorage.getItem('user')),
      {editComment, deleteComment} = props.clickHandler,
      [isActionFormDisplay, setIsActionFormDisplay] = useState(false)


  let toggleActionForm = () => {
    if (mode !== 'edit') return

    if (userId !== comment.userId) return

    setIsActionFormDisplay(preState => !preState)
  }

  if (!comment.deletedAt)
    if (mode === 'view')
      return (
        <div className={`comment-item-container ${userId === comment.userId ? 'owner' : ''} ${mode}`}>
          <p>{comment.comment}</p>
        </div>
      );
    else
      return (
        <div className={`comment-item-container ${userId === comment.userId ? 'owner' : ''} ${mode}`}>

          {
            !isActionFormDisplay &&
            <p onDoubleClick={toggleActionForm} title={`${comment.user.firstName}, ${comment.createdAt}`}>
              {comment.comment}
              {comment.isEdited && <i> - Edited</i>}
            </p>
          }

          <CommentActionForm
            configs={{comment, isDisplay: isActionFormDisplay}}
            clickHandler={{editComment, deleteComment, toggleActionForm}}
          />
        </div>
      );
  else
    return (
      <div className={`comment-item-container ${userId === comment.userId ? 'owner' : ''} ${mode}`}>
        {
          <p title={`${comment.user.firstName}, ${comment.createdAt}`}>
            <i>Message is deleted.</i>
          </p>
        }
      </div>
    );
}

export default CommentItem;
