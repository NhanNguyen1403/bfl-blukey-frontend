import React, {useEffect, useState} from 'react';

import "./Comment.scss"
import generateInput from "../../../services/Generators/generateInput";
import Input from "../../Inputs/Input/Input";
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";
import CommentItem from "./CommentItem/CommentItem";
import GetAll from "../../../services/Api/GET/getAll"
import Post from "../../../services/Api/POST/post"
import Put from "../../../services/Api/PUT/put"
import Delete from "../../../services/Api/DELETE/delete"

function Comment(props) {
  let {mode, transactionId} = props.configs,
      commentHistory = null,
      {userEdited} = props.clickHandler,
      [comments, setComments]= useState([...props.configs.comments || []].reverse()),
      [messageInput, setMessageInput] = useState(generateInput('Put your comment here...', 'text-area','', 'full',false)),
      sendButton = generateButton('Send', 'text', 'solid', 'lg')

  useEffect(() => {
    // Scroll to latest comment
    commentHistory = document.getElementById(transactionId)

    if (commentHistory){
      commentHistory.scrollTo(0, commentHistory.scrollHeight)
    }
  }, [])
  useEffect(() => {
    // Load comments in view mode
    setComments([...props.configs.comments || []].reverse())

  }, [props.configs.comments])
  useEffect(async () => {
    //Load comments in edit mode
    if (mode === "edit")
      await getComments()
  }, [mode, transactionId])



  let sendComment = async () => {
    console.log('send a Comment with:', messageInput.getValue)
    if (!messageInput.isValid) return

    let payload = {
      transactionId,
      comment: messageInput.getValue
    }
    await Post('transactionComments', payload)
    getComments()
    setMessageInput(generateInput('Put your comment here...', 'text-area', '', 'full',false))
    userEdited()
  }
  let editComment = async (commentId, message) => {
    await Put('transactionComments', commentId, {comment: message})
    getComments()
    userEdited()
  }
  let deleteComment = async (commentId) => {
    await Delete('transactionComments', commentId)
    getComments()
    userEdited()
  }
  let getComments = async () => {
    // Reload comments after commented (edit mode)
    let {data} = await GetAll('transactionComments', {transactionId})
    setComments(data.reverse())
  }




  return (
    <div className={`comment-container ${mode}`}>
      <span className="label">Comments</span>

      <div id={transactionId} className={`comment-history`}>
          {
            comments && comments.length > 0 && comments.map(i => {
              return <CommentItem key={i.id} configs={{comment: i, mode}} clickHandler={{editComment, deleteComment}}/>
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
