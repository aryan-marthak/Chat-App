import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/userGetAllUsers'

function Users() {
    const [allUsers, loading] = useGetAllUsers()
    
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
