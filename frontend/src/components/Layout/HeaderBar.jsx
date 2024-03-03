import React from 'react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth } from '../../shared/hooks/useAuth';
import ProfileModal from '../User/ProfileModal';
import SearchUsersDrawer from '../User/SearchUsersDrawer';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';

const HeaderBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <Box height={'60px'} boxShadow={'0 1px 5px 0 rgba(0, 0, 0, 0.19)'}>
      <Flex justifyContent={'space-between'}>
        <Tooltip label={'Search users to chat'} hasArrow>
          <SearchUsersDrawer />
        </Tooltip>
        <Text fontSize={'3xl'} fontFamily={'Work sans'} marginTop={1}>
          Yolo Chat
        </Text>
        <Flex>
          <Menu>
            <MenuButton aria-label={'Notifications'} background={'#fff'} marginTop={2} marginRight={2}>
              <BellIcon height={'25px'} width={'25px'} />
            </MenuButton>
            <MenuList>
              {/*<MenuItem></MenuItem>*/}
              <Text m={1}>No New Notifications</Text>
            </MenuList>
          </Menu>
          {console.log(user)}
          {isAuthenticated && (
            <Menu>
              <MenuButton
                as={IconButton}
                variant="outline"
                rightIcon={<ChevronDownIcon />}
                marginTop={2}
                marginRight={2}
                p={1}
                border={'none'}
              >
                <Avatar size="sm" cursor={'pointer'} src={user?.pic} loading={'lazy'} name={user.name} />
              </MenuButton>
              <MenuList>
                <ProfileModal>
                  <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeaderBar;
