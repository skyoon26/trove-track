import { useState } from 'react'
import './App.css'
import OffcanvasNavbar from './components/Navbar/OffcanvasNavbar';
import LandingPage from './pages/LandingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import OrderPage from './pages/OrderPage/OrderPage';
import ManagePage from './pages/ManagePage/ManagePage';
import SearchPage from './pages/SearchPage/SearchPage';
import AccountPage from './pages/AccountPage/AccountPage';

function App() {

  return (
    <>
      <OffcanvasNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
