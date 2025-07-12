import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Button,
  Image
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Text);
const MotionPanel = motion(AccordionPanel);

// ✅ Enhanced testimonials with optional logos
const testimonials = [
  {
    name: 'Ravi Kumar',
    role: 'Tech Startup Founder',
    content: 'JeeSum Forms transformed how we collect user feedback. The analytics are incredibly detailed!',
    rating: 5,
    company: 'TechCorp',
    logo: 'https://img.icons8.com/color/48/000000/startup.png'
  },
  {
    name: 'Anjali Mehta',
    role: 'Educational Coordinator',
    content: 'Perfect for our university events. Students love the QR code feature!',
    rating: 5,
    company: 'Delhi University',
    logo: 'https://img.icons8.com/color/48/000000/university.png'
  },
  {
    name: 'Priya Singh',
    role: 'Marketing Manager',
    content: 'The team collaboration features are game-changing. We can work together seamlessly.',
    rating: 5,
    company: 'Digital Agency',
    logo: 'https://img.icons8.com/color/48/000000/marketing.png'
  },
];

// ✅ FAQ Data
const allFaqs = [
  {
    question: 'How easy is it to create a form?',
    answer: 'Creating a form with JeeSum Forms is incredibly simple! Our drag-and-drop interface allows you to build professional forms in just a few minutes. No coding skills required.'
  },
  {
    question: 'Can I customize the appearance of my forms?',
    answer: 'Absolutely! JeeSum Forms offers extensive customization options including themes, colors, fonts, and layouts. You can match your brand perfectly.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We use enterprise-grade encryption and are fully GDPR compliant. Your data is stored securely and never shared with third parties.'
  },
  {
    question: 'What integrations are available?',
    answer: 'We integrate with popular tools like Google Drive, Dropbox, Slack, and many more. Our API also allows custom integrations.'
  },
  {
    question: 'Do you offer customer support?',
    answer: 'Yes! We provide 24/7 customer support through multiple channels including live chat, email, and phone support.'
  },
  {
    question: 'Can I collaborate with my team?',
    answer: 'Definitely! JeeSum Forms supports real-time collaboration, allowing multiple team members to work on forms simultaneously.'
  }
];

const TestimonialsAndFAQs = () => {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const displayedFaqs = showAllFaqs ? allFaqs : allFaqs.slice(0, 3);

  return (
    <>
      {/* Testimonials */}
      <Box py={24} bg="white" id="testimonials">
        <Container maxW="7xl">
          <VStack spacing={16}>
            <MotionHeading
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(135deg, blue.800, pink.800)"
              bgClip="text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Loved by Thousands Worldwide
            </MotionHeading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {testimonials.map((testimonial, i) => (
                <MotionBox
                  key={testimonial.name}
                  p={10}
                  bg="white"
                  borderRadius="3xl"
                  boxShadow="xl"
                  border="1px solid"
                  borderColor="gray.100"
                  whileHover={{
                    y: -8,
                    boxShadow: '2xl',
                    borderColor: 'blue.200'
                  }}
                  initial={{ opacity: 0, y: 50, rotate: -1 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <VStack spacing={6} align="start">
                    <HStack>
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <MotionBox
                          key={`${testimonial.name}-star-${j}`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.5 + j * 0.1, duration: 0.5 }}
                        >
                          <Icon as={FaStar} color="yellow.400" boxSize={5} />
                        </MotionBox>
                      ))}
                    </HStack>
                    <Text fontStyle="italic" fontSize="lg" color="gray.700" lineHeight="1.6">
                      "{testimonial.content}"
                    </Text>
                    <HStack spacing={4}>
                      <Avatar name={testimonial.name} size="lg" bg="blue.500" />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" fontSize="md" color="gray.800">
                          {testimonial.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {testimonial.role} at {testimonial.company}
                        </Text>
                      </VStack>
                      {testimonial.logo && (
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.company} logo`}
                          boxSize="32px"
                          borderRadius="md"
                        />
                      )}
                    </HStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box py={24} bgGradient="linear(135deg, gray.50, blue.50, pink.50)">
        <Container maxW="6xl">
          <VStack spacing={16}>
            <MotionHeading
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(135deg, blue.800, pink.800)"
              bgClip="text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked Questions
            </MotionHeading>

            <Box w="full" maxW="4xl">
              <Accordion allowToggle>
                {displayedFaqs.map((faq, i) => (
                  <MotionBox
                    key={faq.question}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <AccordionItem border="none" mb={4}>
                      <AccordionButton
                        bg="white"
                        borderRadius="xl"
                        p={6}
                        _hover={{ bg: 'blue.50' }}
                        boxShadow="md"
                        _expanded={{ bg: 'blue.50', borderColor: 'blue.200' }}
                      >
                        <Box flex="1" textAlign="left">
                          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                            {faq.question}
                          </Text>
                        </Box>
                        <AccordionIcon color="blue.600" />
                      </AccordionButton>
                      <MotionPanel
                        pb={4}
                        px={6}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Text color="gray.600" fontSize="md" lineHeight="1.6">
                          {faq.answer}
                        </Text>
                      </MotionPanel>
                    </AccordionItem>
                  </MotionBox>
                ))}
              </Accordion>

              <Box textAlign="center" mt={8}>
                <Button
                  size="md"
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => setShowAllFaqs(prev => !prev)}
                >
                  {showAllFaqs ? 'Show Less' : 'Show More'}
                </Button>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default TestimonialsAndFAQs;
