import React, { useEffect } from 'react';
import { ChatState } from '../../shared/context/ChatProvider';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { accessChat, fetchAllChats } from '../../services/chats.service';
import ChatListItem from './ChatListItem';
import { AddIcon } from '@chakra-ui/icons';
import CreateGroupModal from './GroupChat/CreateGroupModal';

const MyChats = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchAllChatsApi = () => {
    fetchAllChats().then((response) => {
      setChats(response);
    });
  };

  useEffect(() => {
    fetchAllChatsApi();
  }, []);

  return (
    <Box
      background={'#fff'}
      display={{ md: 'block', base: selectedChat ? 'none' : 'block' }}
      width={{ md: '30%', base: '100%' }}
      margin={'10px'}
      borderRadius={'10px'}
      padding={'10px'}
    >
      <Flex
        background={'#fff'}
        width={'100%'}
        padding={'10px'}
        borderTopRadius={'10px'}
        justifyContent={'space-between'}
      >
        <Text fontSize={{ base: '24px', md: '18px', lg: '22px', xl: '28px' }} fontFamily={'Work sans'}>
          My Chats
        </Text>
        <CreateGroupModal>
          <Button leftIcon={<AddIcon />} background={'#d9edf7ab'}>
            Create Group
          </Button>
        </CreateGroupModal>
      </Flex>
      <Box background={'#f0f0f0'} padding={'10px'} borderRadius={'10px'} height={'calc(100% - 65px)'} overflow={'auto'}>
        {chats?.map((chat) => (
          <ChatListItem key={chat._id} chat={chat} />
        ))}
      </Box>
    </Box>
  );
};

export default MyChats;
