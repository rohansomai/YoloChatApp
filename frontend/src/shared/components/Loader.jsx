import React from 'react';
import { Spinner, Text } from '@chakra-ui/react';

const Loader = () => {
  return (
    <>
      <Spinner color={'#3182ce'} /> <Text>Loading...</Text>
    </>
  );
};

export default Loader;
