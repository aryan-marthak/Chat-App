import React from 'react'
import User from './User'
import userGetAllUsers from '../../context/userGetAllUsers'

function Users() {
    const [allUsers, loading] = userGetAllUsers()
    
    if (loading) {
        return <div className="max-h-[82vh] no-sc overflow-y-auto">Loading...</div>
    }
    
    return (
        <div className="max-h-[82vh] no-sc overflow-y-auto">
            {allUsers && allUsers.map((user, index) => {
                return <User key={index} user={user} />
            })}
        </div>
    )
}

export default Users
