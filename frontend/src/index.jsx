import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import Router from './Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthProvider';
import ChatProvider from './shared/context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <ChatProvider>
          <Router />
        </ChatProvider>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
