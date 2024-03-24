import React from 'react';
import { Avatar, Tag, TagCloseButton, TagLabel, Tooltip } from '@chakra-ui/react';

const UserChip = ({user, onDelete}) => {
  return (
    <Tag
      size={'lg'}
      colorScheme={'blue'}
      borderRadius={'full'}
      margin={'5px'}
      key={user._id}
      maxWidth={'150px'}
    >
      <Avatar src={user?.pic} loading={'lazy'} name={user.name} size="xs" ml={-1} mr={2} />
      <Tooltip label={user.name}>
        <TagLabel>{user.name}</TagLabel>
      </Tooltip>
      <TagCloseButton onClick={onDelete} />
    </Tag>
  );
};

export default UserChip;
