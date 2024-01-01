import React, { useEffect, useState } from 'react';
import { fetchAllChats } from '../services/chats.service';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchAllChatsApi = () => {
    fetchAllChats()
      .then((response) => {
        console.log(response);
        setChats(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllChatsApi();
  }, []);

  return (
    <div>
      {chats.map(({ chatName }, index) => (
        <div key={index}>{chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
