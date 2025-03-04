import React from 'react'
import { IoSend } from "react-icons/io5"

export default function Type() {
    return (
        <>
            <div className='flex'>
                <div className='w-[70%]'>
                    <input type="text" placeholder="Type here" className="input border-none shadow-none grow outline-none bg-slate-900 input-bordered w-full" />
                </div>
                <button className='text-3xl'>
                    <IoSend />
                </button>
            </div>
        </>
    )
}
