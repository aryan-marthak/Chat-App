import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function Login() {
    const { authUser, setAuthUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setError('');
            setIsLoading(true);
            console.log('Attempting login with:', data.email);
            
            const userInfo = {
                email: data.email,
                password: data.password,
            };
            
            const response = await axios.post("/api/user/login", userInfo, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log('Login response:', response.data);
            
            if (response.data && response.data.user) {
                // Store user data in localStorage
                localStorage.setItem("messenger", JSON.stringify(response.data.user));
                
                // Store token in cookie with proper options
                if (response.data.token) {
                    Cookies.set("jwt", response.data.token, {
                        expires: 10, // 10 days
                        secure: true,
                        sameSite: 'strict',
                        path: '/'
                    });
                    console.log('Token stored in cookie');
                } else {
                    console.log('No token in response');
                }
                
                setAuthUser(response.data.user);
                navigate('/');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                setError(error.response.data.message || 'Login failed');
            } else if (error.request) {
                setError('No response from server. Please check if the server is running.');
            } else {
                setError('An error occurred during login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-white px-6 py-3 rounded-md w-96 space-y-3'>
                    <h1 className='text-blue-600 font-bold text-2xl'>Messenger</h1>
                    <h2 className='text-2xl items-center'>Log In with your <span className='text-blue-600 font-semibold'>Account</span></h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Email */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                    </label>
                    {errors.email && <span className="text-red-600 text-sm font-semibold">**This field is required**</span>}

                    {/* Password */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                    </label>
                    {errors.password && <span className="text-red-600 text-sm font-semibold">**This field is required**</span>}

                    {/* Button */}
                    <div className='flex justify-center'>
                        <button 
                            type="submit" 
                            className='text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    <p>Don't have an account? <Link to={"/signup"} className='text-blue-500 underline cursor-pointer'>Signup</Link></p>
                </form>
            </div>
        </>
    );
}
