import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className='py-4 px-6'>
            <form action="">
                <div className='flex space-x-3'>
                    <label className="border-[1px] rounded-lg flex items-center w-[80%] gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                    </label>
                    <button>
                        <IoSearch className='text-[2.5rem] p-2 hover:bg-gray-600 rounded-full duration-300' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search
