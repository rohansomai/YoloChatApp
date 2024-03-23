import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const handleSetSelectedChat = (value) => {
    setSelectedChat(value);
  };

  const handleSetChats = (value) => {
    setChats(value);
  };

  return (
    <ChatContext.Provider
      value={{ selectedChat, setSelectedChat: handleSetSelectedChat, chats, setChats: handleSetChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
