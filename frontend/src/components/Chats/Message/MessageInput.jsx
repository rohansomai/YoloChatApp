import React, { useState } from 'react';
import { Flex, IconButton, Textarea, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageInput = ({ handleMessageSend, newMessage, setNewMessage }) => {
  const handleOnChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend(newMessage);
    }
  };

  return (
    <Flex>
      <Textarea
        placeholder={'Message'}
        background={'#d9edf7'}
        _hover={{ borderColor: '#3182ce' }}
        colorScheme={'blue'}
        rows={1}
        resize={'none'}
        value={newMessage}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
      />
      <Tooltip label={'Send'}>
        <IconButton
          aria-label={'Send Message'}
          backgroundColor={'#b3e4fd'}
          _hover={{ backgroundColor: '#b8def2' }}
          marginLeft={'3px'}
          onClick={() => {
            handleMessageSend(newMessage);
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default MessageInput;
