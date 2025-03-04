import React from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import Type from './Type'

function Right() {
    return (
        <>
            <div className='w-[70%] text-white bg-slate-950'>
                <ChatUser />
                <Messages />
                <Type />
            </div>
        </>
    )
}

export default Right
