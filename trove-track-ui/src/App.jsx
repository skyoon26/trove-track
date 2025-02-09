import { useState, useEffect } from 'react'
import './App.css'
import OffcanvasNavbar from './components/Navbar/OffcanvasNavbar';
import LandingPage from './pages/LandingPage/LandingPage';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import OrderPage from './pages/OrderPage';
import HistoryPage from './pages/HistoryPage';
import AccountPage from './pages/AccountPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/home');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <>
      <OffcanvasNavbar 
        handleLogin={handleLogin}
        handleLogout={handleLogout} 
        isAuthenticated={isAuthenticated}  
      />
      <div className="page-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage handleLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
          <Route path="/order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/signin'} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
