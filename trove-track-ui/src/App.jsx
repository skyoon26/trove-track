import { useState } from 'react'
import './App.css'
import OffcanvasNavbar from './components/Navbar/OffcanvasNavbar';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {

  return (
    <>
      <OffcanvasNavbar />
      <LandingPage />
    </>
  )
}

export default App
