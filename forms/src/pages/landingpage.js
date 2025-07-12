import{ useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Avatar,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Badge,
  Circle,
  Divider,
  Collapse,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  FaClipboardList, FaEdit, FaQrcode, FaPlay, FaTools,
  FaRocket, FaChartLine, FaShieldAlt, FaCloud, FaMobile, FaUsers,
  FaStar, FaCheckCircle, FaArrowRight, FaGlobe, FaCode, FaHeadset,
  FaChevronDown, FaPlus, FaMinus
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedLoader from '../components/enhancedLoader';
import { useNavigate } from 'react-router-dom';
import FeatureSection from './landing/features';
import TestimonialsAndFAQs from './landing/testimonials';
import TechAndTeam from './landing/technology';

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const stats = [
  { number: '50K+', label: 'Forms Created', icon: FaClipboardList },
  { number: '2M+', label: 'Responses Collected', icon: FaUsers },
  { number: '99.9%', label: 'Uptime', icon: FaCheckCircle },
  { number: '150+', label: 'Countries', icon: FaGlobe },
];




const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);

  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, you would use React Router here
    alert(`Navigation to ${path} - This would redirect in a real application`);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);


  if (loading) return <EnhancedLoader />;

  return (
    <Box>
      {/* Enhanced Header with glassmorphism */}
      <MotionBox
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        position="fixed"
        top="0"
        width="100%"
        zIndex="1000"
        backdropFilter="blur(20px)"
        bg="rgba(255, 255, 255, 0.9)"
        borderBottom="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
      >
        <Flex justify="space-between" align="center" px={8} py={4}>
          <MotionHeading
            size="lg"
            bgGradient="linear(135deg, blue.700, pink.700)"
            bgClip="text"
            whileHover={{ scale: 1.05 }}
            cursor="pointer"
            onClick={() => navigate('/')}
          >
            🚀 JeeSum Forms
          </MotionHeading>
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {[
              { name: 'Features', path: '#features' },
              { name: 'Demo', path: '#demo' },
              { name: 'Testimonials', path: '#testimonials' },
              { name: 'Pricing', path: '/pricing' }
            ].map((item, i) => (
              <MotionText
                key={item.name}
                cursor="pointer"
                fontWeight="600"
                color="gray.700"
                whileHover={{ 
                  color: '#1a365d', 
                  scale: 1.1,
                  y: -2
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </MotionText>
            ))}
            <MotionButton
              bgGradient="linear(135deg, blue.700, pink.700)"
              color="white"
              size="md"
              _hover={{ transform: 'translateY(-3px)', boxShadow: '2xl' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/create-form')}
            >
              Get Started Free
            </MotionButton>
          </HStack>
        </Flex>
      </MotionBox>

      {/* Enhanced Hero Section with floating elements */}
      <Box
        minHeight="100vh"
        bgGradient="linear(135deg, blue.50, purple.50, pink.50)"
        pt="100px"
        position="relative"
        overflow="hidden"
      >
        {/* Floating animated elements */}
        {[...Array(8)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width={`${20 + i * 10}px`}
            height={`${20 + i * 10}px`}
            bgGradient={i % 2 === 0 ? "radial(blue.300, transparent)" : "radial(pink.300, transparent)"}
            borderRadius="full"
            top={`${10 + i * 10}%`}
            left={`${5 + i * 12}%`}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            opacity="0.4"
          />
        ))}

        <Container maxW="7xl" centerContent py={20}>
          <MotionVStack
            spacing={10}
            textAlign="center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <MotionBox
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
            >
              <Badge
                colorScheme="blue"
                fontSize="md"
                px={6}
                py={3}
                borderRadius="full"
                mb={6}
                bgGradient="linear(135deg, blue.100, pink.100)"
                color="blue.800"
              >
                ✨ New: AI-Powered Form Suggestions
              </Badge>
            </MotionBox>
            
            <MotionHeading
              fontSize={{ base: '4xl', md: '7xl' }}
              fontWeight="900"
              bgGradient="linear(135deg, blue.800, purple.700, pink.800)"
              bgClip="text"
              lineHeight="1.1"
              animate={{ 
                scale: [1, 1.02, 1],
                textShadow: ["0 0 0px rgba(0,0,0,0.1)", "0 0 20px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Build Stunning Forms
              <br />
              <Text as="span" color="gray.600">in Seconds</Text>
            </MotionHeading>
            
            <MotionText
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.600"
              maxW="3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              lineHeight="1.6"
            >
              Create professional forms with our intuitive drag-and-drop builder. 
              Get real-time analytics, QR sharing, and seamless integrations.
            </MotionText>

            <HStack spacing={6} pt={8}>
              <MotionButton
                size="xl"
                bgGradient="linear(135deg, blue.700, pink.700)"
                color="white"
                rightIcon={<FaArrowRight />}
                px={10}
                py={8}
                fontSize="lg"
                _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/demo')}
              >
                Try Free Demo
              </MotionButton>
              <MotionButton
                size="xl"
                variant="outline"
                borderColor="blue.700"
                color="blue.700"
                borderWidth="2px"
                leftIcon={<FaPlay />}
                px={10}
                py={8}
                fontSize="lg"
                whileHover={{ scale: 1.05, borderColor: 'pink.700', color: 'pink.700' }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
              >
                Watch Video
              </MotionButton>
            </HStack>

            {/* Enhanced Stats Section */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} pt={16} w="full">
              {stats.map((stat, i) => (
                <MotionVStack
                  key={i}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  cursor="pointer"
                >
                  <Circle size="60px" bgGradient="linear(135deg, blue.600, pink.600)">
                    <Icon as={stat.icon} boxSize={6} color="white" />
                  </Circle>
                  <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                    {stat.number}
                  </Text>
                  <Text fontSize="md" color="gray.600" fontWeight="medium">
                    {stat.label}
                  </Text>
                </MotionVStack>
              ))}
            </SimpleGrid>
          </MotionVStack>
        </Container>
      </Box>
      <FeatureSection navigate={navigate} />
      <TestimonialsAndFAQs/>
      <TechAndTeam/>

      {/* Enhanced CTA Section */}
      <Box py={32} bgGradient="linear(135deg, blue.800, purple.800, pink.800)" position="relative" overflow="hidden">
        {/* Animated background elements */}
        {[...Array(10)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width={`${30 + i * 20}px`}
            height={`${30 + i * 20}px`}
            bg="whiteAlpha.100"
            borderRadius="full"
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        <Container maxW="6xl" position="relative" zIndex={2}>
          <MotionVStack
            spacing={12}
            textAlign="center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <VStack spacing={6}>
              <MotionHeading
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="900"
                color="white"
                lineHeight="1.1"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Ready to Transform
                <br />
                Your Form Experience?
              </MotionHeading>
              <Text fontSize={{ base: 'xl', md: '2xl' }} color="whiteAlpha.900" maxW="3xl" lineHeight="1.6">
                Join thousands of satisfied users who've revolutionized their data collection process
              </Text>
            </VStack>

            <HStack spacing={6} flexWrap="wrap" justify="center">
              <MotionButton
                size="xl"
                bg="white"
                color="blue.800"
                rightIcon={<FaRocket />}
                px={12}
                py={8}
                fontSize="xl"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
              >
                Start Building Now
              </MotionButton>
              <MotionButton
                size="xl"
                variant="outline"
                borderColor="white"
                color="white"
                borderWidth="2px"
                leftIcon={<FaHeadset />}
                px={12}
                py={8}
                fontSize="xl"
                fontWeight="bold"
                _hover={{ bg: 'whiteAlpha.200' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
              >
                Get Support
              </MotionButton>
            </HStack>

            <HStack spacing={8} pt={8} color="whiteAlpha.800">
              <HStack>
                <Icon as={FaCheckCircle} color="green.300" />
                <Text fontWeight="medium">No Credit Card Required</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="green.300" />
                <Text fontWeight="medium">Free Forever Plan</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="green.300" />
                <Text fontWeight="medium">Setup in 2 Minutes</Text>
              </HStack>
            </HStack>
          </MotionVStack>
        </Container>
      </Box>

      {/* Enhanced Footer */}
      <Box bg="gray.900" py={16} color="white">
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
            <VStack align="start" spacing={6}>
              <MotionHeading
                size="lg"
                bgGradient="linear(135deg, blue.400, pink.400)"
                bgClip="text"
                whileHover={{ scale: 1.05 }}
              >
                🚀 JeeSum Forms
              </MotionHeading>
              <Text color="gray.400" fontSize="md" lineHeight="1.6">
                The most intuitive form builder for modern teams. Create, share, and analyze forms with ease.
              </Text>
              <HStack spacing={4}>
                {['Twitter', 'Facebook', 'LinkedIn', 'Instagram'].map((social, i) => (
                  <MotionBox
                    key={social}
                    as="button"
                    p={3}
                    bg="gray.800"
                    borderRadius="full"
                    whileHover={{ scale: 1.1, bg: 'blue.600' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/social/${social.toLowerCase()}`)}
                  >
                    <Icon as={FaGlobe} boxSize={5} />
                  </MotionBox>
                ))}
              </HStack>
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Product
              </Text>
              {['Features', 'Templates', 'Integrations', 'Pricing', 'API'].map((item, i) => (
                <MotionText
                  key={item}
                  color="gray.400"
                  cursor="pointer"
                  whileHover={{ color: 'white', x: 5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/${item.toLowerCase()}`)}
                >
                  {item}
                </MotionText>
              ))}
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Support
              </Text>
              {['Help Center', 'Documentation', 'Contact Us', 'Status', 'Community'].map((item, i) => (
                <MotionText
                  key={item}
                  color="gray.400"
                  cursor="pointer"
                  whileHover={{ color: 'white', x: 5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/support/${item.toLowerCase().replace(' ', '-')}`)}
                >
                  {item}
                </MotionText>
              ))}
            </VStack>

            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                Company
              </Text>
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Blog'].map((item, i) => (
                <MotionText
                  key={item}
                  color="gray.400"
                  cursor="pointer"
                  whileHover={{ color: 'white', x: 5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/company/${item.toLowerCase().replace(' ', '-')}`)}
                >
                  {item}
                </MotionText>
              ))}
            </VStack>
          </SimpleGrid>

          <Divider my={12} borderColor="gray.700" />

          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Text color="gray.400" fontSize="sm">
              © 2024 JeeSum Forms. All rights reserved. Made with ❤️ in India
            </Text>
            <HStack spacing={6} color="gray.400" fontSize="sm">
              <MotionText
                cursor="pointer"
                whileHover={{ color: 'white' }}
                onClick={() => navigate('/privacy')}
              >
                Privacy
              </MotionText>
              <MotionText
                cursor="pointer"
                whileHover={{ color: 'white' }}
                onClick={() => navigate('/terms')}
              >
                Terms
              </MotionText>
              <MotionText
                cursor="pointer"
                whileHover={{ color: 'white' }}
                onClick={() => navigate('/cookies')}
              >
                Cookies
              </MotionText>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Demo Video Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <MotionBox
          as={ModalContent}
          bg="white"
          borderRadius="3xl"
          overflow="hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModalHeader
            bgGradient="linear(135deg, blue.600, pink.600)"
            color="white"
            fontSize="2xl"
            fontWeight="bold"
            py={6}
          >
            <HStack>
              <Icon as={FaPlay} />
              <Text>JeeSum Forms Demo</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" size="lg" />
          <ModalBody p={0}>
            <Box
              height="400px"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <VStack spacing={6}>
                <MotionBox
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Circle size="100px" bgGradient="linear(135deg, blue.600, pink.600)">
                    <Icon as={FaPlay} boxSize={12} color="white" />
                  </Circle>
                </MotionBox>
                <VStack spacing={3}>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                    Demo Video Coming Soon!
                  </Text>
                  <Text color="gray.600" textAlign="center" maxW="md">
                    We're preparing an amazing demo video to showcase all the powerful features of JeeSum Forms.
                  </Text>
                  <MotionButton
                    bgGradient="linear(135deg, blue.600, pink.600)"
                    color="white"
                    leftIcon={<FaRocket />}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onClose();
                      navigate('/demo');
                    }}
                  >
                    Try Interactive Demo Instead
                  </MotionButton>
                </VStack>
              </VStack>
            </Box>
          </ModalBody>
        </MotionBox>
      </Modal>
    </Box>
  );
};

export default LandingPage;