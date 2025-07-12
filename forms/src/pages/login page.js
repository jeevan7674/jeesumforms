import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  Flex,
  IconButton,
  Checkbox,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  useToast,
  keyframes,
  Icon,
  SimpleGrid,
  Divider,
  Link,
  Center
} from '@chakra-ui/react';
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight, Check, 
  Star, Smartphone, Shield, Zap, Users, Globe,
  ChevronLeft, ChevronRight, Play, Coffee, Heart,
  Award, TrendingUp, Clock, CheckCircle, X
} from 'lucide-react';

const InteractiveAuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useToast();

  const isLogin = tabIndex === 0;

  // Animation keyframes
  const float = keyframes`
    0% { transform: translateY(-10px) rotate(-2deg); }
    50% { transform: translateY(10px) rotate(2deg); }
    100% { transform: translateY(-10px) rotate(-2deg); }
  `;

  const pulse = keyframes`
    0% { transform: scale(1); opacity: 0.1; }
    50% { transform: scale(1.1); opacity: 0.2; }
    100% { transform: scale(1); opacity: 0.1; }
  `;

  // Demo features carousel
  const features = [
    {
      title: "Lightning Fast Forms",
      description: "Create professional forms in under 60 seconds",
      icon: Zap,
      gradient: "linear(to-r, yellow.400, orange.500)",
      demo: "⚡ Avg. creation time: 45 seconds"
    },
    {
      title: "Smart Analytics",
      description: "Get insights that matter with AI-powered analytics",
      icon: TrendingUp,
      gradient: "linear(to-r, blue.500, purple.600)",
      demo: "📊 15% increase in response rates"
    },
    {
      title: "Global Reach",
      description: "Connect with users from 150+ countries",
      icon: Globe,
      gradient: "linear(to-r, green.400, blue.500)",
      demo: "🌍 Available in 25+ languages"
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time sync",
      icon: Users,
      gradient: "linear(to-r, pink.500, red.500)",
      demo: "👥 Up to 50 team members"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content: "JeeSum Forms saved us 10+ hours per week on data collection!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Raj Patel",
      role: "Marketing Director",
      content: "The analytics helped us improve our conversion by 40%",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emily Chen",
      role: "Event Coordinator",
      content: "Perfect for managing large-scale events. Highly recommended!",
      rating: 5,
      avatar: "👩‍🎨"
    }
  ];

  const stats = [
    { number: "500K+", label: "Happy Users", icon: Users },
    { number: "2M+", label: "Forms Created", icon: CheckCircle },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!isLogin && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${isLogin ? 'Login' : 'Signup'} successful!`,
        description: 'Welcome to JeeSum Forms 🎉',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Floating Element Component
  const FloatingElement = ({ children, delay = 0 }) => (
    <Box
      animation={`${float} 3s ease-in-out infinite`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Box>
  );

  // Animated Background
  const AnimatedBackground = () => (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={0}>
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          borderRadius="full"
          bgGradient="linear(to-r, blue.400, purple.600)"
          animation={`${pulse} ${Math.random() * 10 + 10}s ease-in-out infinite`}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, blue.50, purple.50, pink.50)" 
      position="relative" 
      overflow="hidden"
    >
      <AnimatedBackground />
      
      <Container maxW="7xl" py={8} position="relative" zIndex={10}>
        <Grid 
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
          gap={{ base: 8, lg: 12 }} 
          alignItems="center" 
          minH="100vh"
        >
          
          {/* Left Side - Interactive Demo & Features */}
          <GridItem>
            <VStack spacing={8} align={{ base: "center", lg: "start" }}>
              
              {/* Header */}
              <Box textAlign={{ base: "center", lg: "left" }}>
                <Heading 
                  size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  bgGradient="linear(to-r, blue.600, purple.600, pink.600)"
                  bgClip="text"
                  mb={4}
                  lineHeight="shorter"
                >
                  Welcome to
                  <br />JeeSum Forms
                </Heading>
                <Text 
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.600" 
                  mb={8}
                >
                  Create stunning forms that convert better
                </Text>
              </Box>

              {/* Interactive Feature Showcase */}
              <Card
                w="full"
                shadow="2xl"
                borderRadius="3xl"
                border="1px"
                borderColor="gray.100"
                overflow="hidden"
              >
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Heading size="lg" color="gray.800">Why Choose Us?</Heading>
                    <HStack spacing={2}>
                      {features.map((_, i) => (
                        <Button
                          key={i}
                          size="xs"
                          minW={i === currentSlide ? "8" : "3"}
                          h="3"
                          borderRadius="full"
                          bg={i === currentSlide ? "blue.600" : "gray.300"}
                          _hover={{}}
                          onClick={() => setCurrentSlide(i)}
                        />
                      ))}
                    </HStack>
                  </Flex>
                </CardHeader>

                <CardBody pt={0}>
                  <Box key={currentSlide}>
                    <HStack spacing={4} mb={6}>
                      <Box
                        p={4}
                        borderRadius="2xl"
                        bgGradient={features[currentSlide].gradient}
                      >
                        <Icon 
                          as={features[currentSlide].icon} 
                          w={8} 
                          h={8} 
                          color="white" 
                        />
                      </Box>
                      <Box>
                        <Heading size="md" color="gray.800" mb={1}>
                          {features[currentSlide].title}
                        </Heading>
                        <Text color="gray.600">
                          {features[currentSlide].description}
                        </Text>
                      </Box>
                    </HStack>
                    
                    <Box
                      bgGradient="linear(to-r, blue.50, purple.50)"
                      borderRadius="2xl"
                      p={4}
                    >
                      <HStack spacing={2}>
                        <Icon as={Star} w={5} h={5} color="yellow.500" />
                        <Text fontWeight="semibold" color="gray.800">
                          {features[currentSlide].demo}
                        </Text>
                      </HStack>
                    </Box>
                  </Box>
                </CardBody>
              </Card>

              {/* Stats Section */}
              <SimpleGrid columns={{ base: 2, lg: 4 }} spacing={4} w="full">
                {stats.map((stat, i) => (
                  <FloatingElement key={i} delay={i * 0.2}>
                    <Card
                      bg="white"
                      borderRadius="2xl"
                      p={6}
                      textAlign="center"
                      shadow="lg"
                      border="1px"
                      borderColor="gray.100"
                      _hover={{ shadow: "xl" }}
                      transition="all 0.3s"
                    >
                      <Icon as={stat.icon} w={8} h={8} mx="auto" mb={2} color="blue.600" />
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">{stat.number}</Text>
                      <Text fontSize="sm" color="gray.600">{stat.label}</Text>
                    </Card>
                  </FloatingElement>
                ))}
              </SimpleGrid>

              {/* Testimonial */}
              <Card
                w="full"
                bg="white"
                borderRadius="2xl"
                p={6}
                shadow="lg"
                border="1px"
                borderColor="gray.100"
              >
                <HStack spacing={4}>
                  <Text fontSize="4xl">{testimonials[0].avatar}</Text>
                  <Box flex={1}>
                    <HStack spacing={1} mb={2}>
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} as={Star} w={4} h={4} color="yellow.500" />
                      ))}
                    </HStack>
                    <Text color="gray.700" fontStyle="italic" mb={2}>
                      "{testimonials[0].content}"
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      - {testimonials[0].name}, {testimonials[0].role}
                    </Text>
                  </Box>
                </HStack>
              </Card>
            </VStack>
          </GridItem>

          {/* Right Side - Auth Form */}
          <GridItem>
            <Flex justify="center" align="center">
              <Box w="full" maxW="md">
                {/* Form Container */}
                <Card
                  shadow="2xl"
                  borderRadius="3xl"
                  border="1px"
                  borderColor="gray.100"
                  overflow="hidden"
                  _hover={{ transform: "translateY(-5px)" }}
                  transition="all 0.3s"
                >
                  {/* Tab Switcher */}
                  <Box bgGradient="linear(to-r, blue.600, purple.600)" p={1}>
                    <Tabs 
                      index={tabIndex} 
                      onChange={setTabIndex}
                      variant="unstyled"
                    >
                      <TabList bg="white" borderRadius="2xl" p={1}>
                        <Tab
                          flex={1}
                          py={3}
                          px={6}
                          borderRadius="xl"
                          fontWeight="semibold"
                          color="gray.600"
                          _selected={{
                            bgGradient: "linear(to-r, blue.600, purple.600)",
                            color: "white",
                            shadow: "lg"
                          }}
                        >
                          Login
                        </Tab>
                        <Tab
                          flex={1}
                          py={3}
                          px={6}
                          borderRadius="xl"
                          fontWeight="semibold"
                          color="gray.600"
                          _selected={{
                            bgGradient: "linear(to-r, blue.600, purple.600)",
                            color: "white",
                            shadow: "lg"
                          }}
                        >
                          Sign Up
                        </Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel p={8}>
                          <VStack spacing={6}>
                            <Box textAlign="center">
                              <Heading size="lg" color="gray.800" mb={2}>
                                Welcome Back!
                              </Heading>
                              <Text color="gray.600">
                                Sign in to continue your form-building journey
                              </Text>
                            </Box>

                            <Box as="form" onSubmit={handleSubmit} w="full">
                              <VStack spacing={6}>
                                {/* Email Field */}
                                <FormControl isInvalid={validationErrors.email}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Email Address
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={Mail} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type="email"
                                      value={formData.email}
                                      onChange={(e) => handleInputChange('email', e.target.value)}
                                      placeholder="Enter your email"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.email}</FormErrorMessage>
                                </FormControl>

                                {/* Password Field */}
                                <FormControl isInvalid={validationErrors.password}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Password
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={Lock} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type={showPassword ? 'text' : 'password'}
                                      value={formData.password}
                                      onChange={(e) => handleInputChange('password', e.target.value)}
                                      placeholder="Enter your password"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                    <InputRightElement>
                                      <IconButton
                                        variant="ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                        icon={<Icon as={showPassword ? EyeOff : Eye} w={5} h={5} />}
                                        color="gray.400"
                                        _hover={{ color: "gray.600" }}
                                      />
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.password}</FormErrorMessage>
                                </FormControl>

                                {/* Remember Me / Forgot Password */}
                                <Flex justify="space-between" w="full">
                                  <Checkbox size="sm" colorScheme="blue">
                                    <Text fontSize="sm" color="gray.600">Remember me</Text>
                                  </Checkbox>
                                  <Link
                                    fontSize="sm"
                                    color="blue.600"
                                    fontWeight="semibold"
                                    _hover={{ color: "blue.800" }}
                                  >
                                    Forgot password?
                                  </Link>
                                </Flex>

                                {/* Submit Button */}
                                <Button
                                  type="submit"
                                  isLoading={isLoading}
                                  loadingText="Processing..."
                                  w="full"
                                  size="lg"
                                  bgGradient="linear(to-r, blue.600, purple.600)"
                                  color="white"
                                  borderRadius="xl"
                                  fontWeight="semibold"
                                  fontSize="lg"
                                  shadow="lg"
                                  _hover={{
                                    shadow: "xl",
                                    transform: "translateY(-1px)"
                                  }}
                                  _active={{ transform: "scale(0.98)" }}
                                  rightIcon={!isLoading && <Icon as={ArrowRight} w={5} h={5} />}
                                >
                                  Sign In
                                </Button>
                              </VStack>
                            </Box>
                          </VStack>
                        </TabPanel>

                        <TabPanel p={8}>
                          <VStack spacing={6}>
                            <Box textAlign="center">
                              <Heading size="lg" color="gray.800" mb={2}>
                                Join Us Today!
                              </Heading>
                              <Text color="gray.600">
                                Start creating amazing forms in minutes
                              </Text>
                            </Box>

                            <Box as="form" onSubmit={handleSubmit} w="full">
                              <VStack spacing={6}>
                                {/* Name Field */}
                                <FormControl isInvalid={validationErrors.name}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Full Name
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={User} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type="text"
                                      value={formData.name}
                                      onChange={(e) => handleInputChange('name', e.target.value)}
                                      placeholder="Enter your full name"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.name}</FormErrorMessage>
                                </FormControl>

                                {/* Email Field */}
                                <FormControl isInvalid={validationErrors.email}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Email Address
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={Mail} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type="email"
                                      value={formData.email}
                                      onChange={(e) => handleInputChange('email', e.target.value)}
                                      placeholder="Enter your email"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.email}</FormErrorMessage>
                                </FormControl>

                                {/* Password Field */}
                                <FormControl isInvalid={validationErrors.password}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Password
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={Lock} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type={showPassword ? 'text' : 'password'}
                                      value={formData.password}
                                      onChange={(e) => handleInputChange('password', e.target.value)}
                                      placeholder="Enter your password"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                    <InputRightElement>
                                      <IconButton
                                        variant="ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                        icon={<Icon as={showPassword ? EyeOff : Eye} w={5} h={5} />}
                                        color="gray.400"
                                        _hover={{ color: "gray.600" }}
                                      />
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.password}</FormErrorMessage>
                                </FormControl>

                                {/* Confirm Password */}
                                <FormControl isInvalid={validationErrors.confirmPassword}>
                                  <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                                    Confirm Password
                                  </FormLabel>
                                  <InputGroup>
                                    <InputLeftElement>
                                      <Icon as={Lock} w={5} h={5} color="gray.400" />
                                    </InputLeftElement>
                                    <Input
                                      type={showConfirmPassword ? 'text' : 'password'}
                                      value={formData.confirmPassword}
                                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                      placeholder="Confirm your password"
                                      size="lg"
                                      borderRadius="xl"
                                      borderWidth="2px"
                                      _focus={{
                                        borderColor: "blue.500",
                                        boxShadow: "none"
                                      }}
                                    />
                                    <InputRightElement>
                                      <IconButton
                                        variant="ghost"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        icon={<Icon as={showConfirmPassword ? EyeOff : Eye} w={5} h={5} />}
                                        color="gray.400"
                                        _hover={{ color: "gray.600" }}
                                      />
                                    </InputRightElement>
                                  </InputGroup>
                                  <FormErrorMessage>{validationErrors.confirmPassword}</FormErrorMessage>
                                </FormControl>

                                {/* Terms Agreement */}
                                <Checkbox size="sm" colorScheme="blue" alignItems="flex-start">
                                  <Text fontSize="sm" color="gray.600">
                                    I agree to the{' '}
                                    <Link
                                      color="blue.600"
                                      fontWeight="semibold"
                                      _hover={{ color: "blue.800" }}
                                    >
                                      Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                      color="blue.600"
                                      fontWeight="semibold"
                                      _hover={{ color: "blue.800" }}
                                    >
                                      Privacy Policy
                                    </Link>
                                  </Text>
                                </Checkbox>

                                {/* Submit Button */}
                                <Button
                                  type="submit"
                                  isLoading={isLoading}
                                  loadingText="Processing..."
                                  w="full"
                                  size="lg"
                                  bgGradient="linear(to-r, blue.600, purple.600)"
                                  color="white"
                                  borderRadius="xl"
                                  fontWeight="semibold"
                                  fontSize="lg"
                                  shadow="lg"
                                  _hover={{
                                    shadow: "xl",
                                    transform: "translateY(-1px)"
                                  }}
                                  _active={{ transform: "scale(0.98)" }}
                                  rightIcon={!isLoading && <Icon as={ArrowRight} w={5} h={5} />}
                                >
                                  Create Account
                                </Button>
                              </VStack>
                            </Box>
                          </VStack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Box>

                  {/* Social Login */}
                  <Box px={8} pb={6}>
                    <Center>
                      <Divider />
                      <Text px={4} bg="white" color="gray.500" fontSize="sm">
                        Or continue with
                      </Text>
                      <Divider />
                    </Center>

                    <SimpleGrid columns={2} spacing={4} mt={6}>
                      <Button
                        variant="outline"
                        leftIcon={
                          <Box
                            w={5}
                            h={5}
                            bg="blue.600"
                            borderRadius="sm"
                            color="white"
                            fontSize="xs"
                            fontWeight="bold"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            G
                          </Box>
                        }
                        borderRadius="xl"
                        _hover={{ bg: "gray.50" }}
                      >
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        leftIcon={
                          <Box
                            w={5}
                            h={5}
                            bg="gray.800"
                            borderRadius="sm"
                            color="white"
                            fontSize="xs"
                            fontWeight="bold"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            M
                          </Box>
                        }
                        borderRadius="xl"
                        _hover={{ bg: "gray.50" }}
                      >
                        Microsoft
                      </Button>
                    </SimpleGrid>
                  </Box>

                  {/* Benefits Footer */}
                  <Box
                    bgGradient="linear(to-r, blue.50, purple.50)"
                    p={6}
                    borderBottomRadius="3xl"
                  >
                    <HStack
                      justify="center"
                      spacing={{ base: 4, md: 6 }}
                      fontSize="sm"
                      color="gray.600"
                      flexWrap="wrap"
                    >
                      <HStack spacing={1}>
                        <Icon as={CheckCircle} w={4} h={4} color="green.500" />
                        <Text>Free forever</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={Shield} w={4} h={4} color="blue.500" />
                        <Text>Secure & Private</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={Zap} w={4} h={4} color="yellow.500" />
                        <Text>Instant setup</Text>
                      </HStack>
                    </HStack>
                  </Box>
                </Card>

                {/* Additional Info */}
                <Text
                  textAlign="center"
                  color="gray.500"
                  fontSize="sm"
                  mt={6}
                >
                  Join 500,000+ users who trust JeeSum Forms for their data collection needs
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default InteractiveAuthPage;