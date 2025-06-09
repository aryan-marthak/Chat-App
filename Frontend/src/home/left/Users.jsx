import React from 'react'
import User from './User'
import userGetAllUsers from '../../context/userGetAllUsers'

function Users() {
    const [allUsers, loading] = userGetAllUsers()
    return (
        <div className="  max-h-[82vh] no-sc overflow-y-auto">
            
        {allUsers.map((user, index) => {
            return <User key = {index} user = {user} />
        })}

        </div>
    )
}

export default Users
