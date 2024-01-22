import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Flex align="center" justify="center" height="100vh" direction="column" textAlign="center">
      <Heading as="h2" size="2xl" color="red.500">
        404 - Not Found
      </Heading>
      <Text mt={4} fontSize="lg" color="gray.600">
        The page you are looking for does not exist.
      </Text>
      <Link to="/chats">
        <Button mt={8} colorScheme="teal" size="lg">
          Take me to chats
        </Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
