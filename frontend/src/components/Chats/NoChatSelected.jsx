import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const NoChatSelected = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Text fontSize={'3xl'} fontFamily={'Work sans'}>
        Click on a user to start chatting
      </Text>
    </Flex>
  );
};

export default NoChatSelected;
