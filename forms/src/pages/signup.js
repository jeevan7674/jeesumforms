// pages/SignupPage.jsx
import {
  Box, Button, Input, Heading, Text, VStack, useToast, Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import {  api2 } from '../actions/api';
export const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${api2}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: 'Signup successful!', status: 'success' });
        sessionStorage.setItem('token', data.token);
        navigate('/');
      } else {
        toast({ title: data.message, status: 'error' });
      }
    } catch {
      toast({ title: 'Signup failed', status: 'error' });
    }
  };

  return (
    <>
      <Header />
      <Flex
        minH="80vh"
        direction={{ base: 'column', md: 'row' }}
        bgGradient="linear(to-r, pink.100, blue.200)"
        p={8}
      >
        <VStack flex={1} align="start" justify="center" spacing={6} p={8}>
          <Heading size="lg">Why Jeesum Forms?</Heading>
          <Text fontSize="lg">
            Jeesum Forms lets you build interactive, shareable, and secure forms for any event or need. Track responses in real-time, design without limits, and enjoy seamless analytics integration.
          </Text>
        </VStack>

        <Box flex={1} bg="white" p={8} borderRadius="md" boxShadow="xl">
          <Heading mb={4}>Sign Up</Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
              Create Account
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};
