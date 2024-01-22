import React, { useEffect, useState } from 'react';
import { fetchAllChats } from '../services/chats.service';
import { useAuth } from '../shared/hooks/useAuth';
import { Button } from '@chakra-ui/react';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const { logout } = useAuth();

  // const fetchAllChatsApi = () => {
  //   fetchAllChats()
  //     .then((response) => {
  //       console.log(response);
  //       setChats(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    // fetchAllChatsApi();
  }, []);

  return (
    <div>
      Chats:
      {/*{chats.map(({ chatName }, index) => (*/}
      {/*  <div key={index}>{chatName}</div>*/}
      {/*))}*/}
      <Button position={'absolute'} right={0} top={0} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default ChatPage;
