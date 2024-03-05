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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validateEmptyString } from '../../utils/string.util';
import { searchUsers } from '../../services/users.service';

const SearchUsersDrawer = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
        if (response) {
          setUsers(response);
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
        setLoading(false);
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
      <Button marginTop={2} marginLeft={3} variant={'ghost'} onClick={onOpen}>
        <SearchIcon mr={3} fontWeight={500} />
        <Text display={{ base: 'none', md: 'flex' }}>Search User</Text>
      </Button>
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
                {loading ? (
                  <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                  </Stack>
                ) : (
                  users?.map((user) => <div key={user._id}>{user.name}</div>)
                )}
              </div>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchUsersDrawer;
