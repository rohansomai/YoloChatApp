import React, { useCallback, useEffect, useState } from 'react';
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
import { ChatState } from '../../../shared/context/ChatProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import UserChip from '../../../shared/components/UserChip';
import Loader from '../../../shared/components/Loader';
import UserListItem from '../../../shared/components/UserListItem';
import { searchUsers } from '../../../services/users.service';
import { debounce } from 'lodash';
import { validateEmptyString } from '../../../utils/string.util';
import { addUserToGroup, removeUserFromGroup, renameGroupName } from '../../../services/chats.service';
import { useAuth } from '../../../shared/hooks/useAuth';
import ConfirmationModal from '../../../shared/components/ConfirmationModal';

const UpdateGroupDetailsModal = ({ children }) => {
  const [groupName, setGroupName] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [previousGroupName, setPreviousGroupName] = useState('');
  const [confirmLeaveModalOpen, setConfirmLeaveModalOpen] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chats, setChats, selectedChat, setSelectedChat, updateChat } = ChatState();
  const { user: loggedInUser } = useAuth();

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

  const addUserToGroupApi = (user) => {
    addUserToGroup({
      groupChatId: selectedChat._id,
      userId: user._id,
    })
      .then((response) => {
        setSelectedChat(response);
        updateChat(response);
        toast({
          title: `${user.name} has been added to this group`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
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
      addUserToGroupApi(user);
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

  const removeUserFromGroupApi = (user, isUpdate) => {
    removeUserFromGroup({
      groupChatId: selectedChat._id,
      userId: user._id,
    }).then((response) => {
      if (isUpdate) {
        setSelectedChat(response);
        updateChat(response);
        toast({
          title: `${user.name} has been removed from this group`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: `You left ${selectedChat.chatName} group`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  const removeUser = (user, isUpdate = true) => {
    if (selectedChat.groupAdmin._id === loggedInUser._id) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
      removeUserFromGroupApi(user, isUpdate);
    } else {
      toast({
        title: `Only admin can remove users from the group`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleModalClose = () => {
    setSearchKeyword('');
    setUsers([]);
    setSelectedUsers(selectedChat.users);
    setGroupName(selectedChat.chatName);
    setPreviousGroupName(selectedChat.chatName);
    onClose();
  };

  const handleRename = async () => {
    try {
      const updatedChat = await renameGroupName({ chatName: groupName, groupChatId: selectedChat._id });
      handleModalClose();
      setSelectedChat(updatedChat);
      updateChat(updatedChat);
      toast({
        title: 'Group renamed successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error renaming group: ', error);
      toast({
        title: 'Error renaming group',
        description: error?.message || undefined,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleKeyUp = async (event) => {
    if (event.key === 'Enter') {
      if (previousGroupName !== groupName) {
        await handleRename();
      }
    }
  };

  const handleLeaveGroup = () => {
    removeUser(loggedInUser, false);
    setSelectedChat(null);
    setChats(chats.filter((chat) => chat._id !== selectedChat._id));
    handleModalClose();
    setConfirmLeaveModalOpen(false);
  };

  useEffect(() => {
    if (selectedChat.isGroupChat) {
      setSelectedUsers(selectedChat.users);
      setGroupName(selectedChat.chatName);
      setPreviousGroupName(selectedChat.chatName);
    }
  }, [onOpen, selectedChat]);

  return (
    <>
      <ConfirmationModal
        description={`After leaving this group you cannot access chat and cannot chat further. Are you sure you want to leave "${selectedChat.chatName}" group?`}
        onConfirm={handleLeaveGroup}
        isOpen={confirmLeaveModalOpen}
        onClose={() => {
          setConfirmLeaveModalOpen(false);
        }}
        buttonColor={'red'}
        buttonText={'Yes Leave'}
      />
      <span onClick={onOpen} style={{ cursor: 'pointer' }}>
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={'3xl'} textAlign={'center'} fontFamily={'Work sans'} fontWeight={'bold'}>
              {selectedChat.chatName}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'space-between'} direction={'column'} alignItems={'center'} gap={'10px'}>
              <Flex width={'100%'}>
                <Input
                  placeholder={'Group Name'}
                  value={groupName}
                  onChange={handleOnGroupNameChange}
                  onKeyUp={handleKeyUp}
                />
                <Button
                  colorScheme={'blue'}
                  onClick={handleRename}
                  marginLeft={'5px'}
                  isDisabled={previousGroupName === groupName}
                >
                  Rename
                </Button>
              </Flex>
              <Input placeholder={'Add more users'} value={searchKeyword} onChange={handleOnSearchUsers} />
              <Flex width={'100%'} flexWrap={'wrap'} maxHeight={'100px'} overflow={'auto'}>
                {selectedUsers.map((user) => (
                  <UserChip
                    user={user}
                    onDelete={() => removeUser(user)}
                    key={user._id}
                    isAdmin={selectedChat.groupAdmin._id === user._id}
                  />
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
            <Button
              mr={3}
              colorScheme={'red'}
              leftIcon={<FontAwesomeIcon icon={faRightFromBracket} color={'#fff'} />}
              onClick={() => {
                setConfirmLeaveModalOpen(true);
              }}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupDetailsModal;
