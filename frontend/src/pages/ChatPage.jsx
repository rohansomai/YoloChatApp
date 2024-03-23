import React from 'react';
import { Box } from '@chakra-ui/react';
import MyChats from '../components/Chats/MyChats';
import ChatBox from '../components/Chats/ChatBox';

const ChatPage = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} height={'100%'}>
      <MyChats />
      <ChatBox />
    </Box>
  );
};

export default ChatPage;
