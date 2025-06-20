// components/Footer.jsx
import { Box, Text, Flex } from '@chakra-ui/react';

export const Footer = () => (
  <Box bg="gray.900" color="white" py={6}>
    <Flex direction="column" align="center">
      <Text fontWeight="bold">© 2025 Jeesum Forms</Text>
      <Text fontSize="sm">Secure | Fast | Intuitive</Text>
    </Flex>
  </Box>
);
