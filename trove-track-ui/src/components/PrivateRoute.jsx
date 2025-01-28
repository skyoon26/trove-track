import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (token exists in localStorage)
  const isAuthenticated = sessionStorage.getItem('authToken') ? true : false;

  // If not authenticated, redirect to SignIn page
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the child components (protected routes)
  return children;
};

export default PrivateRoute;