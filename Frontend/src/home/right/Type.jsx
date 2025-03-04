import React from 'react'
import { IoSend } from "react-icons/io5"

export default function Type() {
    return (
        <>
            <div className='flex space-x-3 text-center bg-slate-800'>
                <div className='w-[91%] mx-4'>
                    <input type="text" placeholder="Type here" className="border-[1px] border-gray-700 bg-slate-900 rounded-xl flex items-center w-full grow outline-none  p-3 m-[0.4rem] " />
                </div>
                <button className='text-3xl'>
                    <IoSend />
                </button>
            </div>
        </>
    )
}
