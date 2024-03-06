import React from 'react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

const NoUsersFound = () => {
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      alignContent={'center'}
      height={'calc(100vh - 180px)'}
    >
      <WarningTwoIcon fontSize={'xx-large'} color={'#ccc'} />
      <Text fontSize={'large'}>No Matching results found</Text>
    </Flex>
  );
};

export default NoUsersFound;
