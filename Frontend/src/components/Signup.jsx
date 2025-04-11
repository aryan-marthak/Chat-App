import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';

export default function Signup() {
    const {authUser, setAuthUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password")
    const confirmpassword = watch("ConfirmPassword")
    
    const validatePasswordMatch = (value) => {
        return value === password || "Password and Confirm Password do not match";
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmpassword: data.ConfirmPassword
        };
        try {
            const response = await axios.post("http://localhost:5002/user/signup", userInfo);
            if (response.data) {
                localStorage.setItem("messenger", JSON.stringify(response.data));
                setAuthUser(response.data);
                alert("Signup Successful! You can now log in.");
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || "An error occurred during signup");
            } else {
                setError("Network error. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className='flex h-screen items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-white px-6 py-3 rounded-md w-96 space-y-3'>
                    <h1 className='text-blue-600 font-bold text-2xl'>Messenger</h1>
                    <h2 className='text-2xl items-center'>Create a new <span className='text-blue-600 font-semibold'>Account</span></h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* username */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input {...register("name", { required: true })} type="text" className="grow" placeholder="Username" />
                    </label>
                    {errors.name && <span className="text-red-600 text-sm font-semibold">**This field is required**</span>}

                    {/* email */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input {...register("email", { required: true })} type="text" className="grow" placeholder="Email" />
                    </label>
                    {errors.email && <span className="text-red-600 text-sm font-semibold">**This field is required**</span>}

                    {/* password */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                    </label>
                    {errors.password && <span className="text-red-600 text-sm font-semibold">**This field is required**</span>}

                    {/* confirmpassword */}
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input {...register("ConfirmPassword", { required: true, validate: validatePasswordMatch })} type="password" className="grow" placeholder="Confirm Password" />
                    </label>
                    {errors.ConfirmPassword && <span className="text-red-600 text-sm font-semibold">**{errors.ConfirmPassword.message}**</span>}

                    {/* Submit Button */}
                    <div className='flex justify-center'>
                        <button 
                            type="submit" 
                            className='text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Signup'}
                        </button>
                    </div>
                    <p>Already have an account? <span className='text-blue-500 underline cursor-pointer'>Login</span></p>
                </form>
            </div>
        </div>
    )
}