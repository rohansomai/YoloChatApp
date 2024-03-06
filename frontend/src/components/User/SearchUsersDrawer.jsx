import {
  Avatar,
  Box,
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
import { SearchIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validateEmptyString } from '../../utils/string.util';
import { searchUsers } from '../../services/users.service';
import { times } from 'lodash';
import UserListItem from './UserListItem';
import NoUsersFound from './NoUsersFound';

const SearchUsersDrawer = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
                <Input placeholder={'Search by name or email'} value={searchKeyword} onChange={handleOnChange} />
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
                  users.map((user) => <UserListItem user={user} key={user._id} />)
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
