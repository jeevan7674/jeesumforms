import React from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Icon,
  Circle,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FaClipboardList, FaEdit, FaQrcode, FaChartLine, FaCloud, FaMobile,
  FaUsers, FaShieldAlt, FaHeadset, FaRocket, FaStar, FaCode, FaGlobe
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Text); // Chakra's Text used as Heading

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
  { title: 'Event Registration', icon: FaRocket, color: 'blue.600' },
  { title: 'Feedback Collection', icon: FaStar, color: 'pink.600' },
  { title: 'Survey Forms', icon: FaClipboardList, color: 'purple.600' },
  { title: 'Club Signups', icon: FaUsers, color: 'teal.600' },
  { title: 'Hackathon Registration', icon: FaCode, color: 'orange.600' },
  { title: 'Global Events', icon: FaGlobe, color: 'green.600' },
];

const FeatureSection = ({ navigate }) => {
  return (
    <>
      {/* Features Section */}
      <Box py={24} bg="white" id="features">
        <Container maxW="7xl">
          <MotionVStack spacing={16}>
            <VStack textAlign="center" spacing={6}>
              <MotionHeading
                fontSize="4xl"
                fontWeight="bold"
                bgGradient="linear(135deg, blue.800, pink.800)"
                bgClip="text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Powerful Features for Every Need
              </MotionHeading>
              <Text fontSize="xl" color="gray.600" maxW="2xl">
                Everything you need to create, share, and analyze forms like a pro
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {features.map((feature, i) => (
                <MotionBox
                  key={i}
                  p={10}
                  bg="white"
                  borderRadius="3xl"
                  boxShadow="xl"
                  border="1px solid"
                  borderColor="gray.100"
                  whileHover={{
                    y: -12,
                    boxShadow: '2xl',
                    borderColor: 'blue.300',
                    scale: 1.02
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <VStack spacing={6} align="start">
                    <MotionBox whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <Circle size="80px" bgGradient="linear(135deg, blue.600, pink.600)">
                        <Icon as={feature.icon} boxSize={8} color="white" />
                      </Circle>
                    </MotionBox>
                    <VStack align="start" spacing={3}>
                      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                        {feature.title}
                      </Text>
                      <Text color="gray.600" fontSize="md" lineHeight="1.6">
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
      <Box py={24} bgGradient="linear(135deg, blue.50, purple.50, pink.50)">
        <Container maxW="7xl">
          <VStack spacing={16}>
            <MotionHeading
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(135deg, blue.800, pink.800)"
              bgClip="text"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Perfect for Every Occasion
            </MotionHeading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {useCases.map((useCase, i) => (
                <MotionBox
                  key={i}
                  p={8}
                  bg="white"
                  borderRadius="2xl"
                  boxShadow="xl"
                  whileHover={{ scale: 1.05, boxShadow: '2xl', rotate: 2 }}
                  initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  cursor="pointer"
                  onClick={() => navigate(`/templates/${useCase.title.toLowerCase()}`)}
                >
                  <HStack spacing={6}>
                    <Circle size="60px" bg={useCase.color} color="white">
                      <Icon as={useCase.icon} boxSize={6} />
                    </Circle>
                    <Text fontWeight="bold" fontSize="xl" color="gray.800">
                      {useCase.title}
                    </Text>
                  </HStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default FeatureSection;
