import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './LoginRegisterPage/Home'
import Login from './LoginRegisterPage/Login'
import EmailVerify from './LoginRegisterPage/EmailVerify'
import ResetPassword from './LoginRegisterPage/ResetPassword'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Favorites from './pages/Favorites'
import Basket from './pages/Basket'


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/basket' element={<Basket/>}/>
      </Routes>
    </div>
  )
}

export default App
