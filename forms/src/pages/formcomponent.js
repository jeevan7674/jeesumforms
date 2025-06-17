import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, Checkbox, Textarea, Select, RadioGroup, Radio, Stack, FormControl, FormLabel, useToast, Text,
  Heading, VStack, HStack
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { api } from '../actions/api';

export const DynamicForm = () => {
  const { formId } = useParams(); // formId comes from the URL
  const [form, setForm] = useState(null); // Store form JSON here
  const [formData, setFormData] = useState({}); // Use object instead of FormData for simplicity
  const toast = useToast();

 // Fetch the form JSON
const fetchForm = async () => {
  try {
    const response = await axios.get(`${api}/get-form/${formId}`);
    setForm(response.data);
  } catch (error) {
    console.error('Error fetching form:', error);
  }
};

// useEffect to fetch form data on component mount
useEffect(() => {
  fetchForm();
}, [formId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = {};
    const craftedFormData = [];
    
    for (const key in formData) {
      craftedFormData.push({
        fieldId: key,
        value: formData[key],
      });
    }
    
    formPayload['submittedValues'] = craftedFormData;
  
    try {
      await axios.post(`${api}/submit-values/${formId}`, formPayload);
      toast({
        title: 'Form submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      setFormData({});
      setForm(null); 
      fetchForm(); 
      
    } catch (error) {
      toast({
        title: 'Form submission failed!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleImageChange = (e, fieldId) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldId]: file,
      }));
    }
  };

  // If the form hasn't loaded yet, show a loading message
  if (!form) return <Text>Loading form...</Text>;

  return (
    <Box
      bg="linear-gradient(125deg, #1f5edb, #fa3fc8)" // Page background gradient
      minH="100vh" // Ensure the page takes up at least the full viewport height
      p={4} // Add some padding
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        maxW={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" }}
        mx="auto"
        p={{ base: 4, sm: 6, md: 8 }}
        boxShadow="xl"
        borderRadius="md"
        bg="white" // Form background solid color
        mt={10}
      >
        <VStack spacing={6} align="start">
          {/* Form Title and Description */}
          <Box textAlign="center" w="full">
            <Heading mb={8} fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} _dark={{ color: 'teal.200' }}>
              {form.title}
            </Heading>

            <Text
              mb={4} // Add margin-bottom for spacing
              color="gray.600"
              _dark={{ color: 'gray.300' }}
              whiteSpace="pre-wrap"
            >
              {form.description || 'No description available.'}
            </Text>

            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }} mb={4}>
              Event Date: {new Date(form.eventDateTime).toLocaleString()}
            </Text>
          </Box>

          {/* Render form fields dynamically */}
          {form.fields.map((field, index) => (
            <FormControl key={index} mb={4} isRequired={field.required}>
              {field.type !== 'submit' && field.type !== 'reset' && (
                <FormLabel color="gray.700" _dark={{ color: 'gray.300' }}>{field.label}</FormLabel>
              )}

              {/* Field rendering based on type */}
              {field.type === 'text' && (
                <Input
                  type="text"
                  name={field.id}
                  placeholder={field.placeholder || 'Enter text'}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'email' && (
                <Input
                  type="email"
                  name={field.id}
                  placeholder={field.placeholder || 'Enter a valid email'}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'url' && (
                <Input
                  type="url"
                  name={field.id}
                  placeholder={field.placeholder || 'Enter a valid URL'}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'phone' && (
                <Input
                  type="tel"
                  name={field.id}
                  placeholder={field.placeholder || 'Enter phone number'}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'date' && (
                <Input
                  type="date"
                  name={field.id}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  name={field.id}
                  placeholder={field.placeholder || 'Enter your message'}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'image' && (
                <Input
                  type="file"
                  name={field.id}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, field.id)}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                />
              )}

              {field.type === 'radio' && (
                <RadioGroup
                  name={field.id}
                  value={formData[field.id] || ''}
                  onChange={(value) => setFormData({ ...formData, [field.id]: value })}
                  mb={4}
                >
                  <Stack direction="column" spacing={4}>
                    {field.options.map((option, idx) => (
                      <Radio key={idx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}

              {field.type === 'select' && field.options && (
                <Select
                  name={field.id}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  focusBorderColor="teal.400"
                  _dark={{ bg: 'gray.700', borderColor: 'teal.300' }}
                  size="md"
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}

              {/* Checkbox group */}
              {field.type === 'checkbox' && field.options && (
                <Stack spacing={4} direction="column" mb={4}>
                  {field.options.map((option, idx) => (
                    <Checkbox
                      key={idx}
                      name={field.id}
                      value={option}
                      isChecked={formData[field.id]?.includes(option) || false}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(formData[field.id] || []), option]
                          : formData[field.id].filter((item) => item !== option);
                        setFormData({ ...formData, [field.id]: newValue });
                      }}
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              )}
            </FormControl>
          ))}

          {/* Submit Button */}
          <HStack spacing={4} justify="center" width="full">
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="full"
            >
              Submit
            </Button>
            <Button
              type="reset"
              colorScheme="gray"
              size="lg"
              width="full"
              onClick={() => setFormData({})} // Reset form data on click
            >
              Reset
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

