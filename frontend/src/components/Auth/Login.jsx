import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fieldNameToSentence } from '../../utils/string.util';
import { login } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const Login = ({ handleCapture }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    Object.entries(input).forEach(([fieldName, fieldValue]) => {
      if (!fieldValue.trim()) {
        newErrors[fieldName] = `${fieldNameToSentence(fieldName)} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const loginApi = (body) => {
    setLoading(true);
    login(body)
      .then((response) => {
        setLoading(false);
        loginUser(response);
        toast({
          title: 'Login Success!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/chats');
      })
      .catch((error) => {
        console.error('Error: ', error);
        toast({
          title: 'Something went wrong!',
          description: error.message || error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const handleLogin = () => {
    if (validate()) {
      handleCapture();
      loginApi({ email: input.email, password: input.password });
    } else {
      console.error('errors: ', errors);
    }
  };

  return (
    <div>
      <VStack spacing={'10px'}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type={'email'}
            onChange={handleInputChange}
            value={input['email']}
            name={'email'}
            isInvalid={Boolean(errors['email'])}
            onKeyUp={handleKeyUp}
            placeholder={'Enter your email'}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              onChange={handleInputChange}
              value={input['password']}
              name={'password'}
              isInvalid={Boolean(errors['password'])}
              onKeyUp={handleKeyUp}
              placeholder={'Enter your password'}
            />
            <InputRightElement>
              <IconButton
                aria-label={passwordVisible ? 'Show' : 'Hide'}
                height={'34px'}
                marginRight={'5px'}
                background={'#fff'}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputRightElement>
          </InputGroup>
          {Object.values(errors).some((err) => err.length > 0) && (
            <Box backgroundColor={'#f5c6cb'} p={3} marginY={2} borderRadius={'lg'} color={'red.700'}>
              {Object.values(errors).map((err) => (
                <Text key={err}>{err}</Text>
              ))}
            </Box>
          )}
          <Button marginTop={3} colorScheme={'blue'} width={'100%'} onClick={handleLogin} isLoading={loading}>
            Login
          </Button>
          <Button marginTop={1} colorScheme={'red'} width={'100%'}>
            Continue as guest
          </Button>
        </FormControl>
      </VStack>
    </div>
  );
};

export default Login;
