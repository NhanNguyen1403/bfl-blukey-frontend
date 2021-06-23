import React, {useEffect} from 'react';

import "./Comment.scss"

function Comment(props) {
  let {comments, mode, transactionID} = props.configs,
    user = JSON.parse(localStorage.getItem('user')),
    commentHistory = null

  useEffect(() => {
    commentHistory = document.getElementById(transactionID)
    commentHistory.scrollTo(0, commentHistory.scrollHeight)
  }, [])

  return (
    <div className={`comment-container ${mode}`}>
      <span className="label">Comments</span>

      <div id={transactionID} className={`comment-history`}>
          {
            comments.map(i => {
              return !i.is_deleted &&
                <p
                  key={i.comment_id}
                  className={`comment-item ${user.id === i.author_id ? 'owner': ''}`}
                  title={`${i.author_name}, ${i.created_date}`}>
                  {i.message}
                </p>
            })
          }
      </div>

      {
        mode === 'edit' &&
        <div className="typing-area">
          <div className="typing">

          </div>

          <div className="send-comment-button">

          </div>
        </div>
      }
    </div>
  );
}

export default Comment;
