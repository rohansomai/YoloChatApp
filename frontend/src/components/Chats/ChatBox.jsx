import React, { useEffect, useState } from 'react';
import { ChatState } from '../../shared/context/ChatProvider';
import { Box, Flex, Spinner, useToast } from '@chakra-ui/react';
import NoChatSelected from './NoChatSelected';
import ChatBoxHeader from './ChatBoxHeader';
import Message from './Message/Message';
import { fetchMessages, sendMessage } from '../../services/chats.service';
import MessageInput from './Message/MessageInput';
import { trim } from 'lodash';
import { validateEmptyString } from '../../utils/string.util';

const ChatBox = () => {
  const { selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const toast = useToast();

  const fetchMessagesApi = () => {
    setMessagesLoading(true);
    fetchMessages(selectedChat._id)
      .then((response) => {
        setMessagesLoading(false);
        if (response) {
          setMessages(response);
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
        setMessagesLoading(false);
        toast({
          title: 'Something went wrong while fetching messages',
          status: 'error',
          description: error?.message || undefined,
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      });
  };

  const sendMessageApi = (content) => {
    setNewMessage('');
    if (!validateEmptyString(content)) {
      const body = { chatId: selectedChat._id, content: trim(content) };
      sendMessage(body)
        .then((response) => {
          if (response) {
          }
        })
        .catch((error) => {
          console.error('Error: ', error);
          toast({
            title: 'Something went wrong while sending message',
            status: 'error',
            description: error?.message || undefined,
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        });
    }
  };

  useEffect(() => {
    if (!!selectedChat) {
      fetchMessagesApi();
    }
  }, [selectedChat]);

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
            <ChatBoxHeader updateMessages={fetchMessagesApi} />
            <Flex flexDirection={'column'} justifyContent={'flex-end'} height={'100%'}>
              {messagesLoading ? (
                <Spinner size={'xl'} width={'60px'} height={'60px'} alignSelf={'center'} margin={'auto'} />
              ) : (
                <Flex flexDirection={'column'} justifyContent={'flex-end'} height={'100%'}>
                  {messages?.map((message) => (
                    <Message message={message?.content} key={message._id} />
                  ))}
                  <MessageInput
                    handleMessageSend={sendMessageApi}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                  />
                </Flex>
              )}
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
