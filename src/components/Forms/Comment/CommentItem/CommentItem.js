import React, {useState} from 'react';

import "./CommentItem.scss"
import CommentActionForm from "../CommentActionForm/CommentActionForm";

function CommentItem(props) {
  let {comment, mode, userID} = props.configs,
      [isActionFormDisplay, setIsActionFormDisplay] = useState(false)


  let toggleActionForm = () => {
    if (mode !== 'edit') return

    if (userID !== comment.author_id) return

    setIsActionFormDisplay(preState => !preState)
  }

  return (
    !comment.is_deleted &&
    <div className={`comment-item-container ${userID === comment.author_id ? 'owner' : ''} ${mode}`}>

      {
        !isActionFormDisplay &&
        <p onDoubleClick={toggleActionForm} title={`${comment.author_name}, ${comment.created_date}`}>
          {comment.message}
        </p>
      }

      <CommentActionForm configs={{comment, isDisplay: isActionFormDisplay}} clickHandler={toggleActionForm}/>
    </div>
  );
}

export default CommentItem;
