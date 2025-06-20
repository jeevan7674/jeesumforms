// pages/LoginPage.jsx
import {
  Box, Button, Input, Heading, Text, VStack, useToast, Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import {  api2 } from '../actions/api';

export const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${api2}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Login successful!', status: 'success' });
        sessionStorage.setItem('token', data.token);
        navigate('/');
      } else {
        toast({ title: data.message, status: 'error' });
      }
    } catch {
      toast({ title: 'Login failed', status: 'error' });
    }
  };

  return (
    <>
      <Header />
      <Flex
        minH="80vh"
        direction={{ base: 'column', md: 'row' }}
        bgGradient="linear(to-r, blue.200, pink.100)"
        p={8}
      >
        <VStack flex={1} align="start" justify="center" spacing={6} p={8}>
          <Heading size="lg">Secure Access</Heading>
          <Text fontSize="lg">
            Jeesum Forms uses encrypted sessions, secure tokens, and zero data sharing policies to keep your data safe. Only you control your forms and responses.
          </Text>
        </VStack>

        <Box flex={1} bg="white" p={8} borderRadius="md" boxShadow="xl">
          <Heading mb={4}>Login</Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleSubmit}>
              Log In
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};
