import React from 'react';
import { Box } from '@chakra-ui/react';

const Message = ({ message }) => {
  return (
    <Box
      backgroundColor={'rgb(190, 227, 248)'}
      marginLeft={'auto'}
      marginY={'10px'}
      borderRadius={'20px'}
      padding={'5px 15px'}
      maxWidth={'75%'}
    >
      {message}
    </Box>
  );
};

export default Message;
