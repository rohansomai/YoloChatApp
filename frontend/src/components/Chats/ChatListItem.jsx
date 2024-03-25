import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { ChatState } from '../../shared/context/ChatProvider';
import { getSender } from '../../shared/helpers/chat.helper';
import { useAuth } from '../../shared/hooks/useAuth';

const ChatListItem = ({ chat }) => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { user } = useAuth();

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
      {chat.isGroupChat ? (
        <Avatar
          name={'Group'}
          marginX={'10px'}
          src={'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg'}
        />
      ) : (
        <Avatar name={getSender(user, chat.users).name} marginX={'10px'} src={getSender(user, chat.users)?.pic} />
      )}
      <div>
        <Text display={'inline-flex'}>{chat.isGroupChat ? chat.chatName : getSender(user, chat.users).name}</Text>
        <Text fontSize={'xs'}>{chat.latestMessage}</Text>
      </div>
    </Box>
  );
};

export default ChatListItem;
