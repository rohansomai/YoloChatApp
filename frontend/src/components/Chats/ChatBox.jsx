import React from 'react';
import { ChatState } from '../../shared/context/ChatProvider';
import { Box, Flex, Input } from '@chakra-ui/react';
import NoChatSelected from './NoChatSelected';
import ChatBoxHeader from './ChatBoxHeader';
import Message from './Message';

const ChatBox = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  console.log('selectedChat: ', selectedChat);
  return (
    <Box
      display={{ base: selectedChat ? 'block' : 'none', md: 'block' }}
      background={'#fff'}
      width={{ md: '70%', base: selectedChat ? '100%' : '70%' }}
      margin={'10px'}
      borderRadius={'10px'}
    >
      {selectedChat ? (
        <Flex padding={'15px'} height={'100%'} flexDirection={'column'}>
          <Flex
            padding={'10px'}
            marginTop={'5px'}
            borderRadius={'10px'}
            height={'100%'}
            backgroundColor={'#d9edf7ab'}
            flexDirection={'column'}
          >
            <ChatBoxHeader />
            <Flex flexDirection={'column'} justifyContent={'flex-end'} height={'100%'}>
              <Flex flexDirection={'column'} justifyContent={'flex-end'} height={'100%'}>
                <Message message={'Hey'} />
              </Flex>
              <Input placeholder={'Message'} background={'#d9edf7'} _hover={{ borderColor: '#3182ce' }} />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <NoChatSelected />
      )}
    </Box>
  );
};

export default ChatBox;
