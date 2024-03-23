import React from 'react';
import HeaderBar from './HeaderBar';
import { Box, Flex } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        width: '100%',
        background: '#d9edf7',
      }}
    >
      <HeaderBar />
      <Box width={'100%'} height={'91vh'} padding={'10px'}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
