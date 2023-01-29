import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loginWithToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error();
        }
        await loginWithToken(token);
      } catch (err) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [loginWithToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
