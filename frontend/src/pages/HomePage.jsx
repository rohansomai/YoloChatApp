import React, { useEffect, useRef } from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';

const HomePage = ({ sessionExpired }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // const videoRef = useRef(null);
  const toast = useToast();

  const handleCapture = async () => {
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //
    //   if (videoRef.current) {
    //     videoRef.current.srcObject = stream;
    //     videoRef.current.play();
    //   }
    //
    //   // Capture image after a delay (e.g., 2 seconds)
    //   setTimeout(() => captureImage(stream), 2000);
    // } catch (error) {
    //   console.error('Error accessing camera:', error);
    // }
  };

  // const captureImage = (stream) => {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //
  //   // Set canvas dimensions to match video stream
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //
  //   // Draw current video frame onto the canvas
  //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //
  //   // Convert canvas to base64-encoded image
  //   const imageData = canvas.toDataURL('image/png');
  //
  //   // Stop the video stream
  //   stream.getTracks().forEach((track) => track.stop());
  //
  //   // Now you can send the imageData to the server or use it as needed
  //   console.log('Captured Image:', imageData);
  // };

  useEffect(() => {
    // If the user is already authenticated, redirect them to the /chat page
    if (isAuthenticated) {
      navigate('/chats');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (sessionExpired) {
      toast({
        title: 'Session Expired! Please Login again',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [sessionExpired]);

  return (
    <div className={'App'}>
      {/*<video ref={videoRef} style={{ display: 'none' }} />*/}
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
                <Login handleCapture={handleCapture} />
              </TabPanel>
              <TabPanel>
                <SignUp handleCapture={handleCapture} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
