import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './LoginRegisterPage/Home'
import Login from './LoginRegisterPage/Login'
import EmailVerify from './LoginRegisterPage/EmailVerify'
import ResetPassword from './loginRegisterPage/ResetPassword'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import Favorites from './pages/Favorites'
import Basket from './pages/Basket'
import DarkModeToggle from "./components/DarkModeToggle";
import { DarkModeProvider } from './context/DarkModeContext'
import Product from './components/Product'
import ProductDetail from './pages/ProductDetail'
import { AppContextProvider } from './context/AppContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { BasketProvider } from './context/BasketContext'




const App = () => {
  
  return (
    <FavoritesProvider>
      <BasketProvider>
      <DarkModeProvider>
      
      <div>
         
      
        <ToastContainer/>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/email-verify' element={<EmailVerify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/basket' element={<Basket/>}/>
          <Route path="/" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
      
      </DarkModeProvider>
      </BasketProvider>
    </FavoritesProvider>
  )
}

export default App
