import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className='h-[10vh] pb-[5.5rem]'>
            <div className='py-4 px-6'>
            <form action="">
                <div className='flex space-x-3'>
                    <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center w-[88%] gap-2 p-3">
                        <input type="text" className="grow outline-none bg-slate-900" placeholder="Search" />
                    </label>
                    <button>
                        <IoSearch className='text-[2.5rem] p-2 hover:bg-gray-600 rounded-full duration-300' />
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Search
