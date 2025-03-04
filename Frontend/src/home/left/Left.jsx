import React from 'react'
import Search from './Search'
import Users from './Users'

function Left() {
    return (
        <>
            <div className='w-[30%] bg-black text-gray-300'>
                <h1 className='font-bold text-3xl pt-4 px-7'>Chats</h1>

                <Search />
                <hr />
                <Users />
            </div>
        </>
    )
}

export default Left
