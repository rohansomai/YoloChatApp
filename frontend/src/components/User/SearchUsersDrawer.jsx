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
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validateEmptyString } from '../../utils/string.util';

const SearchUsersDrawer = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleOnChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (!validateEmptyString(searchKeyword)) {
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
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchUsersDrawer;
