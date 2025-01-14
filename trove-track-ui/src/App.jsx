import { useState } from 'react'
import './App.css'
import OffcanvasNavbar from './components/Navbar/OffcanvasNavbar';
import LandingPage from './pages/LandingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import ManagePage from './pages/ManagePage';
import SearchPage from './pages/SearchPage';
import AccountPage from './pages/AccountPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <>
      <OffcanvasNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  )
}

export default App
