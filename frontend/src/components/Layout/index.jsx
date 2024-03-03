import React from 'react';
import HeaderBar from './HeaderBar';

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderBar />
      {children}
    </div>
  );
};

export default Layout;
