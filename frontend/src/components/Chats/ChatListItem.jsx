import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { ChatState } from '../../shared/context/ChatProvider';

const ChatListItem = ({ chat }) => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const handleChatSelect = () => {
    setSelectedChat(chat);
  };

  return (
    <Box
      backgroundColor={selectedChat?._id === chat?._id ? '#c6e6f6' : '#fff'}
      width={'100%'}
      padding={'5px'}
      cursor={'pointer'}
      _hover={{ backgroundColor: '#d9edf7ab' }}
      onClick={handleChatSelect}
      marginBottom={'10px'}
      borderRadius={'10px'}
      display={'flex'}
    >
      <Avatar name={chat.users[1].name} marginX={'10px'} src={chat.users[1]?.pic} />
      <div>
        <Text display={'inline-flex'}>{chat.isGroupChat ? chat.chatName : chat.users[1].name}</Text>
        <Text fontSize={"xs"}>{chat.latestMessage}</Text>
      </div>
    </Box>
  );
};

export default ChatListItem;
