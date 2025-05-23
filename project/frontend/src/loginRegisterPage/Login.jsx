import React, {useContext, useState} from 'react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import {AppContent} from '../context/AppContext'
import axios from 'axios'
import {toast} from 'material-react-toastify'

const Login = () => {

    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

    const [state, setState,] = useState('Sign Up')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)

            // Set axios defaults
            axios.defaults.withCredentials = true
            
            if (state === "Sign Up") {
                console.log("Attempting to register:", email)
                const {data} = await axios.post(`${backendUrl}/api/auth/register`, 
                    {name, email, password}, 
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (data.success) {
                    toast.success("Registration successful!")
                    setIsLoggedin(true)
                    getUserData()
                    navigate("/")
                } else {
                    toast.error(data.message)
                }
            } else {
                console.log("Attempting to login:", email)
                const {data} = await axios.post(`${backendUrl}/api/auth/login`, 
                    { email, password }, 
                    { 
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                console.log("Login response:", data)

                if (data.success) {
                    toast.success("Login successful!")
                    // Check if cookies are set
                    console.log("Cookies after login:", document.cookie)
                    
                    // Store token in localStorage as a fallback mechanism
                    if (data.token) {
                        localStorage.setItem("auth_token", data.token);
                        console.log("Token stored in localStorage");
                    }
                    
                    setIsLoggedin(true)
                    getUserData()
                    localStorage.setItem("email", email)
                    navigate("/")
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error("Login/Register error:", error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (

        <div
            className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-800 to-white-100'>
            <img onClick={() => navigate('/')} src={assets.kaslogo1} alt=""
                 className='absolute left-5 sm:left-20 top-5 w-10 sm:w-14 cursor-pointer'/>
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === "Sign Up" ? "Crate Account" : "Login"}</h2>
                <p className='text-center text-sm mb-6'>{state === "Sign Up" ? "Create your acoount" : "Login to your account!"}</p>

                <form onSubmit={onSubmitHandler}>
                    {state === 'Sign Up' && (
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                            <img src={assets.person_icon} alt=''/>
                            <input
                                onChange={e => setName(e.target.value)}
                                value={name}
                                className='bg-transparent outline-none' type="text" placeholder='Full Name' required/>
                        </div>
                    )}

                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.mail_icon} alt=''/>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent outline-none' type="email" placeholder='Email' required/>
                    </div>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.lock_icon} alt=''/>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent outline-none' type="password" placeholder='Password' required/>
                    </div>
                    <p onClick={() => navigate('/reset-password')}
                       className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>
                    <button disabled={loading}
                        className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
                        {loading ? "Processing..." : state}
                    </button>
                </form>
                {state === 'Sign Up' ? (
                    <p className='text-gray-400 text-center text-xs mt-4 '>Already have an account?{" "}
                        <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login Here</span>
                    </p>) : (
                    <p className='text-gray-400 text-center text-xs mt-4 '>Don't have account?{" "}
                        <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
                    </p>)}


            </div>


        </div>
    )
}

export default Login
