import React, {useEffect, useState} from 'react';

import "./Comment.scss"
import {generateInput} from "../../../services/Generators/generateInput";
import Input from "../../Inputs/Input/Input";
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import CommentActionForm from "./CommentActionForm/CommentActionForm";
import CommentItem from "./CommentItem/CommentItem";

function Comment(props) {
  let {comments, mode, transactionID, userID} = props.configs,
      commentHistory = null,
      [messageInput, setMessageInput] = useState(generateInput('Put your comment here...', 'text-area','', 'full',false)),
      sendButton = generateButton('Send', 'text', 'solid', 'lg'),
      filterButton = generateButton('Filter', 'icon', 'square', 'md', 'filter-icon')


  useEffect(() => {
    commentHistory = document.getElementById(transactionID)
    if (commentHistory)
      commentHistory.scrollTo(0, commentHistory.scrollHeight)
  }, [])

  let sendComment = () => {
    console.log('send a Comment with:', messageInput.getValue)
  }



  return (
    <div className={`comment-container ${mode}`}>
      <span className="label">Comments</span>

      <div id={transactionID} className={`comment-history`}>
          {
            comments.length > 0 && comments.map(i => {
              return <CommentItem key={i.comment_id} configs={{comment: i, mode, userID}}/>
            })
          }
      </div>

      {
        mode === 'edit' &&
        <div className="typing-area">
          <div className="typing">
            <Input configs={messageInput}/>
          </div>

          <div className="send-comment-button">
            <Button configs={sendButton} clickHandler={sendComment}/>
          </div>
        </div>
      }
    </div>
  );
}

export default Comment;
