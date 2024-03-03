import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';
import Layout from '../components/Layout';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
