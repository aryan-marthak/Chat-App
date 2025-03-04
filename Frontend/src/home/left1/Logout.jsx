import React from 'react'
import { TbLogout2 } from "react-icons/tb"

function Logout() {
    return (
        <div className='w-[3%] bg-slate-950 text-white flex flex-col justify-end'>
            <div className='p-1 align-bottom'>
                <form action="">
                    <div className='flex space-x-3'>
                        <button>
                            <TbLogout2 className='text-[2.5rem] p-2 hover:bg-gray-600 rounded-lg duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Logout
