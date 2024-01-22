import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ChatPage from '../../pages/ChatPage';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../NotFound';

const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={'/chats'} element={<ChatPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
