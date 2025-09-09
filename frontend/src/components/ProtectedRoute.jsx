import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

// Component to protect routes that should only be accessible when NOT authenticated
const AuthProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Component to protect routes that should only be accessible when authenticated
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export { AuthProtectedRoute, PrivateRoute };
