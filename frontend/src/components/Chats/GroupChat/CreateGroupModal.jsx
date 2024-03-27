import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { searchUsers } from '../../../services/users.service';
import { debounce, isEmpty } from 'lodash';
import UserListItem from '../../../shared/components/UserListItem';
import { validateEmptyString } from '../../../utils/string.util';
import UserChip from '../../../shared/components/UserChip';
import Loader from '../../../shared/components/Loader';
import { createGroupChat } from '../../../services/chats.service';
import { ChatState } from '../../../shared/context/ChatProvider';

const CreateGroupModal = ({ children }) => {
  const [groupName, setGroupName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chats, setChats, setSelectedChat } = ChatState();

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

  const handleUserSelect = (user) => {
    if (!selectedUsers.find((selectedUser) => selectedUser._id === user._id)) {
      setSelectedUsers((prevState) => [...prevState, user]);
    } else {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const debounceFn = useCallback(debounce(searchUsersApi, 500), []);

  const handleOnGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleOnSearchUsers = (event) => {
    setSearchKeyword(event.target.value);
    !validateEmptyString(event.target.value) && debounceFn(event.target.value);
  };

  const removeUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  };

  const handleOnClose = () => {
    setGroupName('');
    setSearchKeyword('');
    setUsers([]);
    setSelectedUsers([]);
    onClose();
  };

  const isCreateGroupButtonDisabled = useMemo(
    () => () => {
      return Boolean(validateEmptyString(groupName) || isEmpty(selectedUsers));
    },
    [selectedUsers, groupName]
  );

  const createGroupChatApi = () => {
    const body = {
      name: groupName,
      users: JSON.stringify(selectedUsers.map((user) => user._id)),
    };
    createGroupChat(body)
      .then((response) => {
        setChats([response, ...chats]);
        setSelectedChat(response);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Error creating group Chat',
          description: error?.message || undefined,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleCreateGroup = () => {
    handleOnClose();
    createGroupChatApi();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={handleOnClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={'3xl'} textAlign={'center'} fontFamily={'Work sans'} fontWeight={'bold'}>
              Create Group
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'space-between'} direction={'column'} alignItems={'center'} gap={'10px'}>
              <Input placeholder={'Group Name'} value={groupName} onChange={handleOnGroupNameChange} />
              <Input placeholder={'Add Users'} value={searchKeyword} onChange={handleOnSearchUsers} />
              <Flex width={'100%'} flexWrap={'wrap'} maxHeight={'100px'} overflow={'auto'}>
                {selectedUsers.map((user) => (
                  <UserChip user={user} onDelete={() => removeUser(user)} key={user._id} />
                ))}
              </Flex>
              {loading ? (
                <Loader />
              ) : (
                <Box width={'100%'} maxHeight={'250px'} overflow={'auto'}>
                  {usersLoaded &&
                    users.map((user) => (
                      <UserListItem user={user} key={user._id} handleUserSelect={() => handleUserSelect(user)} />
                    ))}
                </Box>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleCreateGroup} colorScheme={'blue'} isDisabled={isCreateGroupButtonDisabled()}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
