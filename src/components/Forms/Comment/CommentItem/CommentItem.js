import React, {useState} from 'react';

import "./CommentItem.scss"
import CommentActionForm from "../CommentActionForm/CommentActionForm";
import moment from 'moment'

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
            <div className={`content ${userId === comment.userId ? 'reverse' : ''}`}>
              <p 
                onDoubleClick={toggleActionForm} 
                title={moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              >
                {comment.comment}
                {comment.isEdited && <i> - Edited</i>}
              </p>

              <span>
                {comment.user.firstName}
              </span>
            </div>
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
          <div className={`content ${userId === comment.userId ? 'reverse' : ''}`}>
            <p title={`${comment.user.firstName}, ${comment.createdAt}`}>
              <i>Message is deleted.</i>
            </p>

            <span>
                {comment.user.firstName}
              </span>
          </div>
        }
      </div>
    );
}

export default CommentItem;
