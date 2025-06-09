import React from 'react'

function User({ user }) {
    return (
        <div>
            <div className='flex space-x-4 px-7 py-4 hover:bg-slate-700 cursor-pointer duration-300'>
                <div className="avatar avatar-online">
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div>
                    <h1 className='font-bold'>{user.name}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}

export default User
