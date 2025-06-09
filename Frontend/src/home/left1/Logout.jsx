import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { TbLogout2 } from "react-icons/tb"

function Logout() {
    const [loading, setLoading] = useState(false)
    const handleLogout = async() => {
        setLoading(true);
        try {
            const response =  await axios.post("/api/user/logout")
            localStorage.removeItem("messenger")
            Cookies.remove("jwt")
            setLoading(false);
            alert("Logout Successful !")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[3%] bg-slate-950 text-white flex flex-col justify-end'>
            <div className='p-1 align-bottom'>
                <form action="">
                    <div className='flex space-x-3'>
                        <button>
                            <TbLogout2 onClick={handleLogout} className='text-[2.5rem] p-2 hover:bg-gray-600 rounded-lg duration-300' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Logout
