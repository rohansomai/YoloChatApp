import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Input,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validateEmptyString } from '../../utils/string.util';
import { searchUsers } from '../../services/users.service';
import { times } from 'lodash';
import UserListItem from '../../shared/components/UserListItem';
import NoUsersFound from './NoUsersFound';
import { accessChat } from '../../services/chats.service';
import { ChatState } from '../../shared/context/ChatProvider';

const SearchUsersDrawer = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const handleOnChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const searchUsersApi = (searchKeyword) => {
    setLoading(true);
    searchUsers(searchKeyword)
      .then((response) => {
        setLoading(false);
        setUsersLoaded(true);
        if (response) {
          setUsers(response);
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
        setLoading(false);
        setUsersLoaded(true);
      });
  };

  const handleSearch = () => {
    if (!validateEmptyString(searchKeyword)) {
      searchUsersApi(searchKeyword);
    } else {
      toast({
        title: 'Search cannot be empty',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    }
  };

  const accessChatApi = (userId) => {
    setChatLoading(true);
    accessChat({ userId })
      .then((response) => {
        setChatLoading(false);
        if (response) {
          setSelectedChat(response);
        } else {
          console.error('Chat not found', response);
        }
      })
      .catch((error) => {
        console.error(error);
        setChatLoading(false);
        toast({
          title: 'Error accessing chat',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleUserSelect = (userId) => {
    accessChatApi(userId);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Tooltip label={'Search users to chat'} hasArrow>
        <Button marginTop={2} marginLeft={3} variant={'ghost'} onClick={onOpen}>
          <SearchIcon mr={3} fontWeight={500} />
          <Text display={{ base: 'none', md: 'flex' }}>Search User</Text>
        </Button>
      </Tooltip>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={1}>Search Users</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <Flex>
                <Input
                  placeholder={'Search by name or email'}
                  value={searchKeyword}
                  onChange={handleOnChange}
                  onKeyUp={handleKeyUp}
                />
                <Button marginLeft={2} onClick={handleSearch}>
                  Go
                </Button>
              </Flex>
              <div>
                {loading && (
                  <Stack marginTop={2}>
                    {times(10, (i) => (
                      <Skeleton key={i} height={55} padding={2} borderRadius={5} />
                    ))}
                  </Stack>
                )}
                {users.length > 0 ? (
                  users.map((user) => (
                    <UserListItem user={user} key={user._id} handleUserSelect={() => handleUserSelect(user._id)} />
                  ))
                ) : usersLoaded ? (
                  <NoUsersFound />
                ) : null}
              </div>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchUsersDrawer;
