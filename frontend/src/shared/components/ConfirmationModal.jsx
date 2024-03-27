import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const ConfirmationModal = ({ onConfirm, title, description, buttonColor, buttonText, isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title || 'Are you sure?'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{description}</ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme={buttonColor || 'blue'} onClick={onConfirm}>
              {buttonText || 'Confirm'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
