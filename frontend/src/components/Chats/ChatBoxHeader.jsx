import React from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import ProfileModal from '../User/ProfileModal';
import { ChatState } from '../../shared/context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ChatBoxHeader = () => {
  const { selectedChat, setSelectedChat } = ChatState();
  const handleBack = () => {
    setSelectedChat(null);
  };
  return (
    <Flex justifyContent={'space-between'}>
      <Flex alignItems={'center'}>
        <IconButton
          aria-label={'Go back'}
          display={{ base: selectedChat ? 'block' : 'none', md: 'none' }}
          onClick={handleBack}
          background={'transparent'}
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar name={selectedChat.users[1].name} marginX={'10px'} src={selectedChat.users[1]?.pic} />
        <Text display={'inline-flex'} fontSize={'2xl'} fontFamily={'Work sans'}>
          {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].name}
        </Text>
      </Flex>
      <ProfileModal user={selectedChat.users[1]} />
    </Flex>
  );
};

export default ChatBoxHeader;
