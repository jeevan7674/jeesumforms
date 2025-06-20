import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Avatar,
  HStack,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Center,
  Circle,
  Divider,
} from '@chakra-ui/react';
// Removed router import for standalone version
import {
  FaClipboardList, FaEdit, FaQrcode, FaShareAlt, FaPlay, FaTools,
  FaRocket, FaChartLine, FaShieldAlt, FaCloud, FaMobile, FaUsers,
  FaStar, FaCheckCircle, FaArrowRight, FaGlobe, FaCode, FaHeadset
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

// Enhanced features with new additions
const features = [
  { title: 'Dynamic Field Builder', icon: FaClipboardList, desc: 'Drag & drop form builder with 20+ field types' },
  { title: 'Live Form Preview', icon: FaEdit, desc: 'Real-time preview as you build your forms' },
  { title: 'QR Code & Social Sharing', icon: FaQrcode, desc: 'Instant QR codes and social media integration' },
  { title: 'Advanced Analytics', icon: FaChartLine, desc: 'Deep insights into form performance and responses' },
  { title: 'Cloud Integration', icon: FaCloud, desc: 'Seamless integration with Google Drive, Dropbox' },
  { title: 'Mobile Responsive', icon: FaMobile, desc: 'Perfect experience across all devices' },
  { title: 'Team Collaboration', icon: FaUsers, desc: 'Real-time collaboration with team members' },
  { title: 'Security & Privacy', icon: FaShieldAlt, desc: 'Enterprise-grade security and GDPR compliance' },
  { title: '24/7 Support', icon: FaHeadset, desc: 'Round-the-clock customer support' },
];

const useCases = [
  { title: 'Event Registration', icon: FaRocket, color: 'blue.400' },
  { title: 'Feedback Collection', icon: FaStar, color: 'pink.400' },
  { title: 'Survey Forms', icon: FaClipboardList, color: 'purple.400' },
  { title: 'Club Signups', icon: FaUsers, color: 'teal.400' },
  { title: 'Hackathon Registration', icon: FaCode, color: 'orange.400' },
  { title: 'Global Events', icon: FaGlobe, color: 'green.400' },
];

const testimonials = [
  { 
    name: 'Ravi Kumar', 
    role: 'Tech Startup Founder', 
    content: 'JeeSum Forms transformed how we collect user feedback. The analytics are incredibly detailed!',
    rating: 5,
    company: 'TechCorp'
  },
  { 
    name: 'Anjali Mehta', 
    role: 'Educational Coordinator', 
    content: 'Perfect for our university events. Students love the QR code feature!',
    rating: 5,
    company: 'Delhi University'
  },
  { 
    name: 'Priya Singh', 
    role: 'Marketing Manager', 
    content: 'The team collaboration features are game-changing. We can work together seamlessly.',
    rating: 5,
    company: 'Digital Agency'
  },
];

const stats = [
  { number: '50K+', label: 'Forms Created', icon: FaClipboardList },
  { number: '2M+', label: 'Responses Collected', icon: FaUsers },
  { number: '99.9%', label: 'Uptime', icon: FaCheckCircle },
  { number: '150+', label: 'Countries', icon: FaGlobe },
];

const techStack = [
  { name: 'React', logo: '⚛️', color: 'blue.400' },
  { name: 'Chakra UI', logo: '🎨', color: 'teal.400' },
  { name: 'Node.js', logo: '🟢', color: 'green.400' },
  { name: 'MongoDB', logo: '🍃', color: 'green.600' },
  { name: 'Axios', logo: '📡', color: 'purple.400' },
  { name: 'React Router', logo: '🛣️', color: 'orange.400' },
  { name: 'Framer Motion', logo: '✨', color: 'pink.400' },
];

const team = [
  { 
    name: 'Jeevan Reddy', 
    role: 'Full Stack Developer & Founder', 
    photo: '👨‍💻',
    skills: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
    social: { github: '#', linkedin: '#', twitter: '#' }
  },
];

// Enhanced Loading Component
const EnhancedLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 2;
        return 100;
      });
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
      bgGradient="linear(135deg, blue.400, purple.500, pink.400)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      zIndex="9999"
    >
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Circle size="80px" bg="white" boxShadow="xl">
          <Icon as={FaRocket} boxSize="40px" color="blue.500" />
        </Circle>
      </MotionBox>
      
      <Box mt={8} textAlign="center">
        <Text color="white" fontSize="xl" fontWeight="bold" mb={4}>
          {loadingText}
        </Text>
        <Box width="300px" height="4px" bg="whiteAlpha.300" borderRadius="full" overflow="hidden">
          <MotionBox
            height="100%"
            bgGradient="linear(to-r, white, pink.200)"
            borderRadius="full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </Box>
        <Text color="whiteAlpha.800" fontSize="sm" mt={2}>
          {progress}%
        </Text>
      </Box>
    </Box>
  );
};

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <EnhancedLoader />;

  return (
    <Box>
      {/* Enhanced Header */}
      <MotionBox
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        backdropFilter="blur(10px)"
        bg="whiteAlpha.900"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex justify="space-between" align="center" px={6} py={4}>
          <MotionHeading
            size="lg"
            bgGradient="linear(135deg, blue.500, pink.500)"
            bgClip="text"
            whileHover={{ scale: 1.05 }}
          >
            🚀 JeeSum Forms
          </MotionHeading>
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
            {['Features', 'Demo', 'Testimonials', 'Pricing'].map((item, i) => (
              <MotionText
                key={item}
                cursor="pointer"
                fontWeight="medium"
                color="gray.700"
                whileHover={{ color: 'blue.500', scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </MotionText>
            ))}
            <MotionButton
              bgGradient="linear(135deg, blue.500, pink.500)"
              color="white"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as="button"
              onClick={() => alert('Redirecting to form builder...')}
            >
              Get Started Free
            </MotionButton>
          </HStack>
        </Flex>
      </MotionBox>

      {/* Enhanced Hero Section */}
      <Box
        minHeight="100vh"
        bgGradient="linear(135deg, blue.50, purple.50, pink.50)"
        pt="80px"
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background Elements */}
        <MotionBox
          position="absolute"
          top="10%"
          left="5%"
          width="300px"
          height="300px"
          bgGradient="radial(blue.200, transparent)"
          borderRadius="full"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          opacity="0.3"
        />
        <MotionBox
          position="absolute"
          top="20%"
          right="10%"
          width="200px"
          height="200px"
          bgGradient="radial(pink.200, transparent)"
          borderRadius="full"
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          opacity="0.4"
        />

        <Container maxW="6xl" centerContent py={20}>
          <MotionVStack
            spacing={8}
            textAlign="center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Badge
              colorScheme="blue"
              fontSize="sm"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
            >
              ✨ New: AI-Powered Form Suggestions
            </Badge>
            
            <MotionHeading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="900"
              bgGradient="linear(135deg, blue.600, purple.600, pink.600)"
              bgClip="text"
              lineHeight="1.2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Build Stunning Forms
              <br />
              <Text as="span" color="gray.600">in Seconds</Text>
            </MotionHeading>
            
            <MotionText
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              maxW="2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Create professional forms with our drag-and-drop builder. 
              Get real-time analytics, QR sharing, and seamless integrations.
            </MotionText>

            <HStack spacing={4} pt={6}>
              <MotionButton
                size="lg"
                bgGradient="linear(135deg, blue.500, pink.500)"
                color="white"
                rightIcon={<FaArrowRight />}
                _hover={{ transform: 'translateY(-3px)', boxShadow: '2xl' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
              >
                Try Free Demo
              </MotionButton>
              <MotionButton
                size="lg"
                variant="outline"
                colorScheme="blue"
                leftIcon={<FaPlay />}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Video
              </MotionButton>
            </HStack>

            {/* Stats Section */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} pt={12} w="full">
              {stats.map((stat, i) => (
                <MotionVStack
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Icon as={stat.icon} boxSize={6} color="blue.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    {stat.number}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </MotionVStack>
              ))}
            </SimpleGrid>
          </MotionVStack>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Box py={20} bg="white">
        <Container maxW="6xl">
          <MotionVStack spacing={12}>
            <VStack textAlign="center" spacing={4}>
              <MotionHeading
                size="2xl"
                bgGradient="linear(135deg, blue.600, pink.600)"
                bgClip="text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Powerful Features for Every Need
              </MotionHeading>
              <Text fontSize="lg" color="gray.600" maxW="xl">
                Everything you need to create, share, and analyze forms like a pro
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {features.map((feature, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="gray.100"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: '2xl',
                    borderColor: 'blue.200'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <VStack spacing={4} align="start">
                    <Circle size="60px" bgGradient="linear(135deg, blue.400, pink.400)">
                      <Icon as={feature.icon} boxSize={6} color="white" />
                    </Circle>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="xl" fontWeight="bold" color="gray.800">
                        {feature.title}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {feature.desc}
                      </Text>
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionVStack>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box py={20} bgGradient="linear(135deg, blue.50, purple.50, pink.50)">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <MotionHeading
              size="2xl"
              textAlign="center"
              bgGradient="linear(135deg, blue.600, pink.600)"
              bgClip="text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Perfect for Every Occasion
            </MotionHeading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {useCases.map((useCase, i) => (
                <MotionBox
                  key={i}
                  p={6}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="md"
                  whileHover={{ scale: 1.05, boxShadow: 'xl' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HStack spacing={4}>
                    <Circle size="50px" bg={useCase.color} color="white">
                      <Icon as={useCase.icon} boxSize={5} />
                    </Circle>
                    <Text fontWeight="bold" fontSize="lg">
                      {useCase.title}
                    </Text>
                  </HStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Enhanced Testimonials */}
      <Box py={20} bg="white">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <MotionHeading
              size="2xl"
              textAlign="center"
              bgGradient="linear(135deg, blue.600, pink.600)"
              bgClip="text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Loved by Thousands Worldwide
            </MotionHeading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {testimonials.map((testimonial, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="gray.100"
                  whileHover={{ y: -5, boxShadow: '2xl' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <VStack spacing={4} align="start">
                    <HStack>
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Icon key={j} as={FaStar} color="yellow.400" />
                      ))}
                    </HStack>
                    <Text fontStyle="italic" fontSize="md" color="gray.700">
                      "{testimonial.content}"
                    </Text>
                    <HStack>
                      <Avatar name={testimonial.name} size="md" />
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="sm">
                          {testimonial.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {testimonial.role} at {testimonial.company}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Tech Stack */}
      <Box py={20} bgGradient="linear(135deg, gray.50, blue.50, pink.50)">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <MotionHeading
              size="2xl"
              textAlign="center"
              bgGradient="linear(135deg, blue.600, pink.600)"
              bgClip="text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Built with Modern Technology
            </MotionHeading>

            <SimpleGrid columns={{ base: 2, md: 4, lg: 7 }} spacing={8}>
              {techStack.map((tech, i) => (
                <MotionVStack
                  key={i}
                  p={6}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Text fontSize="3xl">{tech.logo}</Text>
                  <Text fontSize="sm" fontWeight="bold" color={tech.color}>
                    {tech.name}
                  </Text>
                </MotionVStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Enhanced Team Section */}
      <Box py={20} bg="white">
        <Container maxW="6xl">
          <VStack spacing={12}>
            <VStack textAlign="center" spacing={4}>
              <MotionHeading
                size="2xl"
                bgGradient="linear(135deg, blue.600, pink.600)"
                bgClip="text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Meet Our Amazing Team
              </MotionHeading>
              <Text fontSize="lg" color="gray.600" maxW="xl">
                Passionate developers building the future of form creation
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {team.map((member, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor="gray.100"
                  textAlign="center"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: '2xl',
                    borderColor: 'blue.200'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <VStack spacing={6}>
                    {/* Profile Avatar with Gradient Border */}
                    <Box position="relative">
                      <Circle
                        size="120px"
                        bgGradient="linear(135deg, blue.400, pink.400)"
                        p="4px"
                      >
                        <Circle size="110px" bg="white" fontSize="4xl">
                          {member.photo}
                        </Circle>
                      </Circle>
                      <Circle
                        size="30px"
                        bg="green.400"
                        position="absolute"
                        bottom="5px"
                        right="10px"
                        border="3px solid white"
                      >
                        <Text fontSize="xs">✓</Text>
                      </Circle>
                    </Box>

                    {/* Member Info */}
                    <VStack spacing={2}>
                      <Text fontSize="xl" fontWeight="bold" color="gray.800">
                        {member.name}
                      </Text>
                      <Text fontSize="md" color="blue.500" fontWeight="medium">
                        {member.role}
                      </Text>
                    </VStack>

                    {/* Skills */}
                    <SimpleGrid columns={2} spacing={2} w="full">
                      {member.skills.map((skill, j) => (
                        <Badge
                          key={j}
                          colorScheme="blue"
                          variant="subtle"
                          fontSize="xs"
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </SimpleGrid>

                    {/* Social Links */}
                    <HStack spacing={4} pt={2}>
                      <MotionBox
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Circle
                          size="40px"
                          bg="gray.800"
                          color="white"
                          cursor="pointer"
                          _hover={{ bg: 'gray.700' }}
                        >
                          <Text fontSize="lg">🐙</Text>
                        </Circle>
                      </MotionBox>
                      <MotionBox
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Circle
                          size="40px"
                          bg="blue.600"
                          color="white"
                          cursor="pointer"
                          _hover={{ bg: 'blue.500' }}
                        >
                          <Text fontSize="lg">💼</Text>
                        </Circle>
                      </MotionBox>
                      <MotionBox
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Circle
                          size="40px"
                          bg="blue.400"
                          color="white"
                          cursor="pointer"
                          _hover={{ bg: 'blue.300' }}
                        >
                          <Text fontSize="lg">🐦</Text>
                        </Circle>
                      </MotionBox>
                    </HStack>

                    {/* Fun Stats */}
                    <SimpleGrid columns={3} spacing={4} w="full" pt={4}>
                      <VStack spacing={1}>
                        <Text fontSize="xl" fontWeight="bold" color="blue.500">
                          50+
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Projects
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="xl" fontWeight="bold" color="pink.500">
                          3+
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Years Exp
                        </Text>
                      </VStack>
                      <VStack spacing={1}>
                        <Text fontSize="xl" fontWeight="bold" color="purple.500">
                          99%
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Success Rate
                        </Text>
                      </VStack>
                    </SimpleGrid>
                  </VStack>
                </MotionBox>
              ))}

              {/* Join Our Team Card */}
              <MotionBox
                p={8}
                bgGradient="linear(135deg, blue.50, pink.50)"
                borderRadius="2xl"
                border="2px dashed"
                borderColor="blue.200"
                textAlign="center"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'blue.400'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <VStack spacing={6}>
                  <Circle
                    size="120px"
                    bg="white"
                    border="2px dashed"
                    borderColor="blue.300"
                    fontSize="4xl"
                  >
                    <Text>👋</Text>
                  </Circle>
                  
                  <VStack spacing={3}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                      Join Our Team!
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      We're always looking for talented developers to join our mission
                    </Text>
                  </VStack>

                  <MotionButton
                    bgGradient="linear(135deg, blue.500, pink.500)"
                    color="white"
                    size="md"
                    rightIcon={<FaArrowRight />}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Redirecting to careers page...')}
                  >
                    View Openings
                  </MotionButton>

                  <HStack spacing={2} pt={2}>
                    <Badge colorScheme="green" variant="subtle">Remote OK</Badge>
                    <Badge colorScheme="blue" variant="subtle">Full-time</Badge>
                  </HStack>
                </VStack>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Enhanced CTA Section */}
      <Box py={20} bgGradient="linear(135deg, blue.500, purple.600, pink.500)" color="white">
        <Container maxW="4xl" textAlign="center">
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MotionHeading
              size="2xl"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Transform Your Forms?
            </MotionHeading>
            <Text fontSize="xl" opacity="0.9" maxW="2xl">
              Join thousands of users who've already revolutionized their data collection process
            </Text>
            <HStack spacing={4}>
              <MotionButton
                size="lg"
                bg="white"
                color="blue.600"
                rightIcon={<FaArrowRight />}
                _hover={{ transform: 'translateY(-3px)', boxShadow: '2xl' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                as="button"
                onClick={() => alert('Redirecting to form builder...')}
              >
                Start Building Now
              </MotionButton>
              <MotionButton
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </MotionButton>
            </HStack>
          </MotionVStack>
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <Box bg="gray.900" color="gray.300" py={12}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
            <VStack align="start" spacing={4}>
              <Heading size="md" bgGradient="linear(135deg, blue.400, pink.400)" bgClip="text">
                🚀 JeeSum Forms
              </Heading>
              <Text fontSize="sm" opacity="0.8">
                The future of form building is here. Create, share, and analyze with ease.
              </Text>
            </VStack>
            
            {['Product', 'Company', 'Resources'].map((section, i) => (
              <VStack key={section} align="start" spacing={3}>
                <Text fontWeight="bold" color="white">{section}</Text>
                {['Features', 'Pricing', 'Templates', 'API'].map((item, j) => (
                  <Text key={item} fontSize="sm" cursor="pointer" _hover={{ color: 'blue.400' }}>
                    {item}
                  </Text>
                ))}
              </VStack>
            ))}
          </SimpleGrid>
          
          <Divider my={8} borderColor="gray.700" />
          
          <Flex justify="space-between" align="center" wrap="wrap">
            <Text fontSize="sm">
              © {new Date().getFullYear()} JeeSum Forms. All rights reserved.
            </Text>
            <HStack spacing={4}>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'blue.400' }}>Privacy</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'blue.400' }}>Terms</Text>
              <Text fontSize="sm" cursor="pointer" _hover={{ color: 'blue.400' }}>Contact</Text>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Demo Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <ModalHeader bgGradient="linear(135deg, blue.500, pink.500)" color="white">
            🎥 JeeSum Forms Demo
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <Box p={8} textAlign="center">
              <VStack spacing={6}>
                <Text fontSize="lg" color="gray.600">
                  Watch how easy it is to create professional forms in minutes!
                </Text>
                <Box
                  width="100%"
                  height="400px"
                  bg="gray.100"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <VStack spacing={4}>
                    <Circle size="80px" bg="blue.500" color="white">
                      <Icon as={FaPlay} boxSize={8} />
                    </Circle>
                    <Text color="gray.600">Demo Video Coming Soon!</Text>
                  </VStack>
                </Box>
                <MotionButton
                  bgGradient="linear(135deg, blue.500, pink.500)"
                  color="white"
                  size="lg"
                  rightIcon={<FaArrowRight />}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  as={Link}
                  to="/create-form"
                >
                  Try It Yourself
                </MotionButton>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LandingPage;