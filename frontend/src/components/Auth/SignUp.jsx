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
import { fieldNameToSentence, validateEmail } from '../../utils/string.util';
import { signUp } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_BASE_URL } from '../../shared/config';
import { useAuth } from '../../shared/hooks/useAuth';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUp = ({ handleCapture }) => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

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
      if (fieldName === 'profilePic') {
        // No validation for profilePic, it's optional
        return;
      }

      if (!fieldValue.trim()) {
        newErrors[fieldName] = `${fieldNameToSentence(fieldName)} is required`;
        isValid = false;
      } else {
        if (fieldName === 'name' && fieldValue.length < 3) {
          newErrors.name = 'Name must be at least 3 characters long';
          isValid = false;
        }

        if (fieldName === 'email' && !validateEmail(fieldValue)) {
          newErrors.email = newErrors.email ? newErrors.email + ' Email is invalid' : 'Email is invalid';
          isValid = false;
        }

        if (fieldName === 'password' && fieldValue.length < 8) {
          newErrors.password = newErrors.password
            ? newErrors.password + ' Password must be 8 characters long'
            : 'Password must be 8 characters long';
          isValid = false;
        }

        if (fieldName === 'confirmPassword' && fieldValue !== input.password) {
          newErrors.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const uploadProfilePicApi = (file) => {
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    axios
      .post(`${USER_API_BASE_URL}/upload-profile-pic`, data)
      .then((response) => {
        setLoading(false);
        setInput({ ...input, profilePic: response.data.imageUrl });
      })
      .catch((error) => {
        console.error('Error: ', error);
        setLoading(false);
      });
  };

  const handleProfilePicUpload = async (event) => {
    if (!event.target.files[0]) {
      toast({
        title: 'Please upload a profile picture!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
      uploadProfilePicApi(event.target.files[0]);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };

  const signUpApi = (body) => {
    setLoading(true);
    signUp(body)
      .then((response) => {
        setLoading(false);
        login(response);
        toast({
          title: 'Sign Up Success!',
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

  const handleSignUp = () => {
    if (validate()) {
      handleCapture();
      signUpApi({ email: input.email, password: input.password, name: input.name, pic: input.profilePic });
    } else {
      console.error('errors: ', errors);
    }
  };

  return (
    <div>
      <VStack spacing={'10px'}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type={'text'}
            onChange={handleInputChange}
            value={input['name']}
            name={'name'}
            isInvalid={Boolean(errors['name'])}
            onKeyUp={handleKeyUp}
            placeholder={'Enter your name'}
          />
        </FormControl>
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
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type={'password'}
            onChange={handleInputChange}
            value={input['confirmPassword']}
            name={'confirmPassword'}
            isInvalid={Boolean(errors['confirmPassword'])}
            onKeyUp={handleKeyUp}
            placeholder={'Confirm your password'}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Profile Pic</FormLabel>
          <Input type={'file'} onChange={handleProfilePicUpload} name={'profilePic'} p={1.5} accept={'image/*'} />
        </FormControl>
        {Object.values(errors).some((err) => err.length > 0) && (
          <Box backgroundColor={'#f5c6cb'} p={3} marginY={2} borderRadius={'lg'} color={'red.700'} width={'100%'}>
            {Object.values(errors).map((err) => (
              <Text key={err}>{err}</Text>
            ))}
          </Box>
        )}
        <Button marginTop={1} colorScheme={'blue'} width={'100%'} onClick={handleSignUp} isLoading={loading}>
          Sign Up
        </Button>
      </VStack>
    </div>
  );
};

export default SignUp;
