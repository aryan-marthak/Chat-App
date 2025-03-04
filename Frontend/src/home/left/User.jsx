import React from 'react'

function User() {
    return (
        <div>
            <div className='flex space-x-4 px-8 py-7 hover:bg-slate-700 cursor-pointer duration-300'>
                <div className="avatar avatar-online">
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>

                <div>
                    <h1 className='font-bold'>Aryan Marthak</h1>
                    <span>aryanmarthak@gmail.com</span>
                </div>
            </div>
        </div>
    )
}

export default User
