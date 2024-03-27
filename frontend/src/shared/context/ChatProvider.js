import { createContext, useContext, useState } from 'react';
import { cloneDeep } from 'lodash';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSetSelectedChat = (value) => {
    setSelectedChat(value);
  };

  const handleSetChats = (value) => {
    setChats(value);
  };

  const updateChat = (updatedChatObj) => {
    const chatsClone = cloneDeep(chats);
    const selectedChatIndex = chats.findIndex((chat) => chat._id === updatedChatObj._id);
    chatsClone[selectedChatIndex] = updatedChatObj;
    setChats([...chatsClone]);
  };

  return (
    <ChatContext.Provider
      value={{ selectedChat, setSelectedChat: handleSetSelectedChat, chats, setChats: handleSetChats, updateChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
