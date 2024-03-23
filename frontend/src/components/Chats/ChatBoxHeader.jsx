import React from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import ProfileModal from '../User/ProfileModal';
import { ChatState } from '../../shared/context/ChatProvider';

const ChatBoxHeader = () => {
  const { selectedChat } = ChatState();
  return (
    <Flex justifyContent={'space-between'}>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <Avatar name={selectedChat.users[1].name} marginX={'10px'} src={selectedChat.users[1]?.pic} />
        <Text display={'inline-flex'} fontSize={'2xl'} fontFamily={'Work sans'}>
          {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].name}
        </Text>
      </div>
      <ProfileModal user={selectedChat.users[1]} />
    </Flex>
  );
};

export default ChatBoxHeader;
