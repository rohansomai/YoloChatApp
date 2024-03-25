import React from 'react';
import {
  Avatar,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const ProfileModal = ({ children, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <span onClick={onOpen} style={{ cursor: 'pointer' }}>
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize={'3xl'} textAlign={'center'} fontFamily={'Work sans'} fontWeight={'bold'}>
              {user.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={'space-between'} direction={'column'} alignItems={'center'}>
              <Avatar src={user.pic} name={user.name} size={'2xl'} />
              <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'Work sans'} marginTop={2}>
                Email: {user.email}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
