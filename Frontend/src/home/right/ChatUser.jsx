import React from 'react'

function ChatUser() {
    return (
        <>
            <div className='p-5 flex space-x-4 bg-gray-900 hover:bg-gray-700 duration-300'>
                <div>
                    <div className="avatar avatar-online">
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-xl'>Aryan Marthak</h1>
                    <span className='text-sm'>Online</span>
                </div>
            </div>
        </>
    )
}

export default ChatUser
