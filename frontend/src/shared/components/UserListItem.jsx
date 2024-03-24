import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleUserSelect }) => {
  return (
    <Box
      padding={2}
      backgroundColor={'#E8E8E8'}
      marginY={2}
      borderRadius={5}
      cursor={'pointer'}
      _hover={{ backgroundColor: '#38B2AC', color: '#fff' }}
      onClick={handleUserSelect}
    >
      <Flex alignItems={'center'}>
        <Avatar src={user.pic} name={user.name} size={'sm'} marginRight={2} />
        <Flex flexDirection={'column'}>
          <Text fontSize={'large'}>{user.name} </Text>
          <Text fontSize={'small'}>{user.email} </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserListItem;
