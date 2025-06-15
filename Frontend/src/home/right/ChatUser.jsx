import React from 'react'
import useConversation from "../../stateManage/useConversation.js"

function ChatUser() {
    const {selectedConversation} = useConversation()
    
    if (!selectedConversation) {
        return (
            <div className='p-5 flex items-center justify-center h-[12vh] bg-gray-900'>
                <h1 className='text-xl text-gray-400'>Select a conversation to start chatting</h1>
            </div>
        )
    }

    return (
        <>
            <div className='p-5 flex space-x-4 h-[12vh] bg-gray-900 hover:bg-gray-700 duration-300'>
                <div>
                    <div className="avatar avatar-online">
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-xl'>{selectedConversation.name}</h1>
                    <span className='text-sm'>Online</span>
                </div>
            </div>
        </>
    )
}

export default ChatUser
