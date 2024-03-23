import React, { useEffect } from 'react';
import { ChatState } from '../../shared/context/ChatProvider';
import { Box, Text } from '@chakra-ui/react';
import { accessChat, fetchAllChats } from '../../services/chats.service';
import ChatListItem from './ChatListItem';

const MyChats = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchAllChatsApi = () => {
    fetchAllChats().then((response) => {
      console.log('response: ', response);
      setChats(response);
    });
  };

  useEffect(() => {
    fetchAllChatsApi();
  }, []);

  return (
    <Box background={'#fff'} width={{ md: '30%', base: '100%' }} margin={'10px'} borderRadius={'10px'} padding={'10px'}>
      <Box background={'#fff'} width={'100%'} padding={'10px'} borderTopRadius={'10px'}>
        <Text fontSize={'3xl'} fontFamily={'Work sans'}>
          My Chats
        </Text>
      </Box>
      <Box background={'#f0f0f0'} padding={'10px'} borderRadius={'10px'} height={'calc(100% - 65px)'}>
        {chats?.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} />
        ))}
      </Box>
    </Box>
  );
};

export default MyChats;
