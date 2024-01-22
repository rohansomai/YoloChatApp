import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import Router from './components/Routes/Router';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
