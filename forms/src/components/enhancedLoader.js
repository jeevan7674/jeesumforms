import React, { useEffect, useState } from 'react';
import { Box, Circle, Icon, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const EnhancedLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 100));
    }, 30);

    const textInterval = setInterval(() => {
      const texts = ['Loading assets...', 'Preparing interface...', 'Almost ready...', 'Welcome!'];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bgGradient="linear(135deg, blue.800, purple.900, pink.800)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      zIndex="9999"
    >
      {[...Array(20)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          width="4px"
          height="4px"
          bg="white"
          borderRadius="full"
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      <MotionBox
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1, repeat: Infinity },
        }}
      >
        <Circle size="100px" bg="white" boxShadow="2xl">
          <Icon as={FaRocket} boxSize="50px" color="blue.600" />
        </Circle>
      </MotionBox>

      <Box mt={8} textAlign="center">
        <MotionText
          color="white"
          fontSize="2xl"
          fontWeight="bold"
          mb={6}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingText}
        </MotionText>
        <Box width="400px" height="6px" bg="whiteAlpha.300" borderRadius="full" overflow="hidden">
          <MotionBox
            height="100%"
            bgGradient="linear(to-r, blue.400, pink.400)"
            borderRadius="full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </Box>
        <Text color="whiteAlpha.800" fontSize="lg" mt={4} fontWeight="medium">
          {progress}%
        </Text>
      </Box>
    </Box>
  );
};

export default EnhancedLoader;
