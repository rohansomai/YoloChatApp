import React from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import ProfileModal from '../User/ProfileModal';
import { ChatState } from '../../shared/context/ChatProvider';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from '../../shared/helpers/chat.helper';
import { useAuth } from '../../shared/hooks/useAuth';
import UpdateGroupDetailsModal from './GroupChat/UpdateGroupDetailsModal';

const ChatBoxHeader = () => {
  const { selectedChat, setSelectedChat } = ChatState();
  const { user } = useAuth();
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
          <ArrowBackIcon fontSize={'x-large'} />
        </IconButton>
        {selectedChat.isGroupChat ? (
          <UpdateGroupDetailsModal>
            <Flex alignItems={'center'}>
              <Avatar
                name={'Group'}
                marginX={'10px'}
                src={'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg'}
              />
              <Text display={'inline-flex'} fontSize={'2xl'} fontFamily={'Work sans'}>
                {selectedChat.chatName}
              </Text>
            </Flex>
          </UpdateGroupDetailsModal>
        ) : (
          <ProfileModal user={getSender(user, selectedChat.users)}>
            <Flex alignItems={'center'}>
              {selectedChat.isGroupChat ? (
                <Avatar
                  name={'Group'}
                  marginX={'10px'}
                  src={'https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg'}
                />
              ) : (
                <Avatar
                  name={getSender(user, selectedChat.users).name}
                  marginX={'10px'}
                  src={getSender(user, selectedChat.users)?.pic}
                />
              )}
              <Text display={'inline-flex'} fontSize={'2xl'} fontFamily={'Work sans'}>
                {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].name}
              </Text>
            </Flex>
          </ProfileModal>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatBoxHeader;
