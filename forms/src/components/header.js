// components/Header.jsx
import {
  Box, Flex, Text, Spacer, IconButton, Menu, MenuButton, MenuList, MenuItem, Avatar
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  api2 } from '../actions/api';

export const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${api2}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.name) setUser(data);
      } catch {}
    };
    if (token) fetchProfile();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <Flex p={4} bg="white" boxShadow="md" align="center">
      <Text fontWeight="bold" fontSize="xl" color="blue.500">
        Jeesum Forms
      </Text>
      <Spacer />
      {user ? (
        <Menu>
          <MenuButton as={IconButton} icon={<Avatar size="sm" name={user.name} />} />
          <MenuList>
            <MenuItem>Hi, {user.name}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex gap={4}>
          <Text cursor="pointer" onClick={() => navigate('/login')}>Login</Text>
          <Text cursor="pointer" onClick={() => navigate('/signup')}>Sign Up</Text>
        </Flex>
      )}
    </Flex>
  );
};
