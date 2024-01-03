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
  VStack,
} from '@chakra-ui/react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fieldNameToSentence, validateEmail, validateEmptyString } from '../../utils/string.util';

const SignUp = () => {
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

  const handleProfilePicUpload = (event) => {
    console.log(event.target.files[0]);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSignUp();
    }
  };

  const handleSignUp = () => {
    console.log(input);
    if (validate()) {
      console.log('SUCCESS');
    } else {
      console.log('errors: ', errors);
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
          />
        </FormControl>
        <FormControl>
          <FormLabel>Profile Pic</FormLabel>
          <Input
            type={'file'}
            onChange={handleProfilePicUpload}
            value={input['profilePic']}
            name={'profilePic'}
            p={1.5}
            accept={'image/*'}
          />
        </FormControl>
        {Object.values(errors).some((err) => err.length > 0) && (
          <Box backgroundColor={'#f5c6cb'} p={3} marginY={2} borderRadius={'lg'} color={'red.700'} width={'100%'}>
            {Object.values(errors).map((err) => (
              <Text key={err}>{err}</Text>
            ))}
          </Box>
        )}
        <Button marginTop={1} colorScheme={'blue'} width={'100%'} onClick={handleSignUp}>
          Sign Up
        </Button>
      </VStack>
    </div>
  );
};

export default SignUp;
