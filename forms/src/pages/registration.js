// src/pages/VisibleFormsPage.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, VStack, Button, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../actions/api';

export const VisibleFormsPage = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchForms = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${api}/formadder`);
          setForms(response.data);
          setError(null);
        } catch (error) {
          const message = error.response
            ? 'Failed to fetch forms from server.'
            : error.request
              ? 'Network error, please check your connection.'
              : 'An error occurred while fetching forms.';
          setError(message);
        } finally {
          setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchForms();
    }, []);

    const formatEventDateTime = (eventDateTime) => {
        const date = new Date(eventDateTime);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
    };

    const goToForm = (formId) => {
        navigate(`/form/${formId}`);
    };

    if (loading) {
        return <Spinner size="xl" color="blue.500" marginTop="8" />;
    }

    if (error) {
        return <Text color="red.500" fontSize="lg" textAlign="center" marginTop="4">{error}</Text>;
    }

    return (
        <Box 
        padding="6" 
        background="linear-gradient(125deg, #1f5edb, #fa3fc8)" 
        minHeight="60vh"
        color="white" 
    >
            <Heading as="h1" size="xl" textAlign="center" color="white" marginBottom="8">
                Available Forms
            </Heading>
            <SimpleGrid 
                columns={{ base: 1, sm: 2, lg: 3 }} 
                spacing={6} 
                width="100%" 
                margin="0 auto"
            >
                {forms.map(form => (
                    <Box 
                        key={form._id} 
                        borderWidth="1px" 
                        borderRadius="lg" 
                        padding="6" 
                        boxShadow="lg" 
                        backgroundColor="white" 
                        _hover={{ boxShadow: "xl" }}
                        transition="box-shadow 0.2s ease-in-out"
                    >
                        <Heading as="h2" size="md" fontWeight="bold" color="blue.700" marginBottom="2">
                            {form.title}
                        </Heading>
                        <Text 
                            color="gray.600" 
                            fontSize="sm" 
                            lineHeight="1.5" 
                            marginBottom="4"
                            noOfLines={{ base: 3, md: 4 }}
                        >
                            {form.description}
                        </Text>
                        <Text fontWeight="medium" color="teal.600" marginBottom="4">
                            Event Date & Time: {formatEventDateTime(form.eventDateTime)}
                        </Text>
                        <Button 
                            colorScheme="blue" 
                            width="full" 
                            onClick={() => goToForm(form._id)}
                        >
                            Fill the Form
                        </Button>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};
