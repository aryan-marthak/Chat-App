import React from 'react'

function Message({ message }) {
  return (
    <div>
      <div className='p-4'>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-info">{message.message}</div>
        </div>
        <div className="chat chat-start">
          <div className='chat-image avatar'></div>
          <div className='chat-bubble'>
            That's never been done in the history of the Jedi.</div>
        </div>
      </div>
    </div>
  )
}

export default Message
