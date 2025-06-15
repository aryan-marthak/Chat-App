import React from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js'
import Loading from '../../components/Loading.jsx'

function Messages() {
    const { messages, loading, selectedConversation } = useGetMessage();
    console.log(messages);

    return (
        <>
        {loading ? (
            <Loading />
        ) : (
            messages.length > 0 && messages.map((message) => (
                <Message key={message._id} message={message} />
            ))
        )}
            <div className='min-h-[80vh]'>
                {!loading && messages.length === 0 && (
                    <div>
                        <p className='text-center mt-[20%] font-bold'>
                            No messages here yet... Start a conversation!
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Messages
