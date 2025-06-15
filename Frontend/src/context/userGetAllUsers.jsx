import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

function userGetAllUsers() {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const getUsers = async() => {
            try {
                // Get token from localStorage first, then cookies
                const storedUser = localStorage.getItem("messenger");
                const user = storedUser ? JSON.parse(storedUser) : null;
                const token = Cookies.get("jwt");
                
                console.log('Stored user:', user);
                console.log('Token from cookie:', token ? 'exists' : 'not found');
                
                if (!token) {
                    console.log('No token found in cookies');
                    setLoading(false);
                    return;
                }

                console.log('Making request to get users...');
                const response = await axios.get("/api/user/getUserProfile", {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                
                console.log('Response from server:', response.data);
                setAllUsers(response.data);
            } catch (error) {
                console.log("Error in userGetAllUsers:", error.response ? error.response.data : error.message);
                if (error.response?.status === 401) {
                    // If unauthorized, clear the token and user data
                    Cookies.remove("jwt");
                    localStorage.removeItem("messenger");
                }
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    }, []);
    
    return [allUsers, loading];
}

export default userGetAllUsers;
