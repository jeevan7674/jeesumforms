import React from 'react';
import {
    Box,
    useTheme,
    Container,
    VStack,
    SimpleGrid,
    Text,
    Badge,
    Image,
    HStack,
    Icon,
    Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers } from 'react-icons/fa';
import {
    SiReact,
    SiChakraui,
    SiNodedotjs,
    SiMongodb,
    SiAxios,
    SiReactrouter,
    SiFramer
} from 'react-icons/si';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Text);
const MotionImage = motion(Image);
const MotionButton = motion(Button);



const team = [
    {
        name: 'Jeevan Reddy',
        role: 'Full Stack Developer',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        skills: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
        social: {
            github: 'https://github.com/jeevan7674',
            linkedin: 'https://www.linkedin.com/in/jeevan-reddy680'
        }
    },
    {
        name: 'Vivek Samella',
        role: 'Backend Developer',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        skills: ['Node.js', 'MongoDB', 'API Design'],
        social: {
            github: '#',
            linkedin: '#'
        }
    },
];

const TechAndTeam = () => {
    const theme = useTheme();



    const techStack = [
        { name: 'React', icon: SiReact, color: theme.colors.blue[400] },
        { name: 'Chakra UI', icon: SiChakraui, color: theme.colors.teal[500] },
        { name: 'Node.js', icon: SiNodedotjs, color: theme.colors.green[500] },
        { name: 'MongoDB', icon: SiMongodb, color: theme.colors.green[600] },
        { name: 'Axios', icon: SiAxios, color: theme.colors.purple[500] },
        { name: 'React Router', icon: SiReactrouter, color: theme.colors.red[500] },
        { name: 'Framer Motion', icon: SiFramer, color: theme.colors.pink[500] },
    ];
    return (
        <>
            {/* Tech Stack Section */}
            <Box py={24} bg="white">
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
                            Built with Modern Technology
                        </MotionHeading>

                        <SimpleGrid columns={{ base: 2, md: 4, lg: 7 }} spacing={8}>
                            {techStack.map((tech, i) => (
                                <MotionVStack
                                    key={tech.name}
                                    p={6}
                                    bg="white"
                                    borderRadius="2xl"
                                    boxShadow="lg"
                                    border="1px solid"
                                    borderColor="gray.100"
                                    whileHover={{
                                        scale: 1.1,
                                        y: -8,
                                        boxShadow: '2xl',
                                        borderColor: tech.color
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    cursor="pointer"
                                >
                                    {/* Animate Icon */}
                                    <motion.div
                                        whileHover={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <Icon as={tech.icon} boxSize={10} color={tech.color} />
                                    </motion.div>
                                    <Text fontWeight="bold" color={tech.color} fontSize="sm">
                                        {tech.name}
                                    </Text>
                                </MotionVStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* Team Section */}
            <Box py={24} bgGradient="linear(135deg, blue.50, purple.50, pink.50)">
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
                            Meet Our Amazing Team
                        </MotionHeading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
                            {team.map((member, i) => (
                                <MotionBox
                                    key={member.name}
                                    p={10}
                                    bg="white"
                                    borderRadius="3xl"
                                    boxShadow="xl"
                                    border="1px solid"
                                    borderColor="gray.100"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -8,
                                        boxShadow: '2xl',
                                        borderColor: 'blue.200'
                                    }}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.8 }}
                                >
                                    <VStack spacing={6}>
                                        <MotionImage
                                            src={member.photo}
                                            alt={member.name}
                                            borderRadius="full"
                                            boxSize="150px"
                                            objectFit="cover"
                                            border="4px solid"
                                            borderColor="blue.200"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <VStack spacing={3} textAlign="center">
                                            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                                                {member.name}
                                            </Text>
                                            <Text fontSize="lg" color="blue.600" fontWeight="medium">
                                                {member.role}
                                            </Text>
                                        </VStack>
                                        <HStack spacing={2} flexWrap="wrap" justify="center">
                                            {member.skills.map((skill, j) => (
                                                <Badge
                                                    key={`${member.name}-skill-${j}`}
                                                    colorScheme="blue"
                                                    variant="subtle"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="sm"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </HStack>
                                        <HStack spacing={4} pt={4}>
                                            <MotionButton
                                                as="a"
                                                href={member.social.github}
                                                target="_blank"
                                                variant="outline"
                                                colorScheme="gray"
                                                leftIcon={<Icon as={FaCode} />}
                                                size="sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                GitHub
                                            </MotionButton>
                                            <MotionButton
                                                as="a"
                                                href={member.social.linkedin}
                                                target="_blank"
                                                variant="outline"
                                                colorScheme="blue"
                                                leftIcon={<Icon as={FaUsers} />}
                                                size="sm"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                LinkedIn
                                            </MotionButton>
                                        </HStack>
                                    </VStack>
                                </MotionBox>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>
        </>
    );
};

export default TechAndTeam;
