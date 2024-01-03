import React from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

const HomePage = () => {
  return (
    <div className={'App'}>
      <Container maxW={'xl'} centerContent>
        <Box
          display={'flex'}
          justifyContent={'center'}
          p={3}
          w={'100%'}
          background={'#fff'}
          borderRadius={'lg'}
          m={'40px 0 15px 0'}
        >
          <Text fontSize={'4xl'} fontFamily={'Work sans'}>
            Yolo Chat
          </Text>
        </Box>
        <Box p={4} w={'100%'} background={'#fff'} borderRadius={'lg'}>
          <Tabs variant={'soft-rounded'} colorScheme={'blue'}>
            <TabList>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
