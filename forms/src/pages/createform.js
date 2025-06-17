import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  Textarea,
  Select,
  RadioGroup,
  Radio,
  Checkbox,
  Switch,
  ChakraProvider,
  Heading,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { Tooltip } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import axios from 'axios'
import { api } from '../actions/api';
import { useNavigate } from 'react-router-dom';

export const DynamicFormBuilder = () => {
  const [formTitle, setFormTitle] = useState(''); // State to manage form title
  const [formDescription, setFormDescription] = useState(''); // State to manage form description
  const [eventDateTime, setEventDateTime] = useState(""); // State to manage event date and time
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate()


  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Label`,
      placeholder: '',
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : [],
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updatedField) => {
    setFields(fields.map(field => (field.id === id ? { ...field, ...updatedField } : field)));
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
    if (selectedField && selectedField.id === id) {
      setSelectedField(null);
    }
  };

  const selectField = (field) => {
    setSelectedField(field);
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedField({
      ...selectedField,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...selectedField.options];
    newOptions[index] = value;
    setSelectedField({ ...selectedField, options: newOptions });
  };

  const addOption = () => {
    setSelectedField({ ...selectedField, options: [...selectedField.options, `Option ${selectedField.options.length + 1}`] });
  };

  const removeOption = (index) => {
    const newOptions = selectedField.options.filter((_, i) => i !== index);
    setSelectedField({ ...selectedField, options: newOptions });
  };

  const saveChanges = () => {
    updateField(selectedField.id, selectedField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const handleReset = () => {
    alert("Form reset!");
  };

  // const handleSaveForm = async () => {
  //   const formData = {
  //     title: formTitle,
  //     description: formDescription,
  //     eventDateTime,
  //     fields,
  //   };

  //   try {
  //     // Replace with your actual backend API call
  //    const res= await axios.post(`${api}/save-form`, {

  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     alert('Form saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving form:', error);
  //     alert('Failed to save form. Please try again.');
  //   }
  // };


  const handleSaveForm = async () => {
    // Validate if the formTitle is provided
    if (!formTitle) {
      alert('Title is required. Please enter a title for the form.');
      return; // Stop the function if the title is missing
    }

    const formData = {
      title: formTitle,
      description: formDescription || '', // Optional, default to empty string if not provided
      eventDateTime: eventDateTime || null, // Optional, default to null if not provided
      fields,
    };

    try {
      const res = await axios.post(`${api}/save-form`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 201) {
        alert('Form saved successfully!');
        navigate('/form'); // Redirect to the form adder page
      } else {
        alert('Failed to save form. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error saving form:', error.response.data);
        alert(`Failed to save form: ${error.response.data.message || 'Please try again.'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from the server. Please check your internet connection and try again.');
      } else {
        console.error('Error saving form:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // You can store this image data in your form state or pass it to another function
      };
      reader.readAsDataURL(file);
    }
  };
  // const maxDescriptionLength = 500;

  // const handleDescriptionChange = (e) => {
  //   setFormDescription(e.target.value);
  // };

  const moveField = (id, direction) => {
    const index = fields.findIndex(field => field.id === id);
    if (direction === 'up' && index > 0) {
      const newFields = [...fields];
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
      setFields(newFields);
    } else if (direction === 'down' && index < fields.length - 1) {
      const newFields = [...fields];
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
      setFields(newFields);
    }
  };




  return (
    <ChakraProvider>
      {/* Outer Box to set the gradient background */}
      <Box
        bgGradient="linear(125deg, #1f5edb, #fa3fc8)" // Applying the gradient
        minHeight="100vh"
        p={4}
      >
        {/* Centered Header with merged gradient */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
          mb={4}
        >
          <Heading size="lg" color="white">
            Dynamic Form Builder
          </Heading>
        </Box>

        {/* Responsive Layout */}
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr', lg: '1fr 1fr' }}
          gap={4}
          p={4}
          bg="whiteAlpha.800" // Optional: Set a different background for the inner content
          borderRadius="md"
          boxShadow="md"
        >
          {/* Add Field Panel */}
          <Box p={4} borderRight="1px solid" borderColor="gray.200">
            <Heading size="md" mb={4}>Add Fields</Heading>
            <Menu>
              <MenuButton as={Button} colorScheme="teal" width="100%">
                Select Field Type
              </MenuButton>
              <MenuList>
                {['text', 'textarea', 'email', 'phone', 'url', 'select', 'radio', 'checkbox', 'date', 'image', 'image-view', 'submit', 'reset'].map(type => (
                  <MenuItem key={type} onClick={() => addField(type)}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} Input
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* Form Preview */}
            <Box mt={8}>
              <Heading size="md" mb={4}>Form Preview</Heading>
              <Box p={4} bg="white" borderWidth="1px" borderRadius="md">
                <form onSubmit={handleSubmit}>
                  {formTitle && (
                    <Heading size="lg" mb={2}>{formTitle}</Heading>
                  )}
                  {formDescription && (
                    <>
                      {/* <Text mb={4}>{formDescription}</Text> */}
                      <Text mt={4} fontWeight="bold">
                        Description:
                      </Text>

                      <Box p={4} bg="gray.100" borderRadius="md" mt={2}>
                        <Text whiteSpace="pre-wrap">{formDescription}</Text>
                      </Box>
                    </>
                  )}
                  {eventDateTime && (
                    <Text fontWeight="bold" mb={4}>Event Date & Time: {new Date(eventDateTime).toLocaleString()}</Text>
                  )}
                  {fields.map(field => {
                    switch (field.type) {
                      case 'text':
                      case 'email':
                      case 'phone':
                      case 'url':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Input type={field.type} placeholder={field.placeholder} />
                          </FormControl>
                        );
                      case 'textarea':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Textarea placeholder={field.placeholder} />
                          </FormControl>
                        );
                      case 'select':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Select placeholder="Select option">
                              {field.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      case 'radio':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <RadioGroup>
                              <Stack spacing={4}>
                                {field.options.map((option, idx) => (
                                  <Radio key={idx} value={option}>{option}</Radio>
                                ))}
                              </Stack>
                            </RadioGroup>
                          </FormControl>
                        );
                      case 'checkbox':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Stack spacing={4}>
                              {field.options.map((option, idx) => (
                                <Checkbox key={idx} value={option}>{option}</Checkbox>
                              ))}
                            </Stack>
                          </FormControl>
                        );
                      case 'date':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Input type="date" />
                          </FormControl>
                        );
                      case 'image':
                        return (
                          <FormControl key={field.id} isRequired={field.required} mb={4}>
                            <FormLabel>{field.label}</FormLabel>
                            <Input type="file" accept="image/*" />
                          </FormControl>
                        );
                      case 'image-view':
                        return (
                          <>
                            <FormControl isRequired={true} mb={4}>
                              <FormLabel>Upload Image (Poster, Banner, QR Code, etc.)</FormLabel>
                              <Input type="file" accept="image/*" onChange={handleImageUpload} />
                              {selectedImage && (
                                <Box
                                  mt={4}
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Image
                                    src={selectedImage}
                                    alt="Selected Preview"
                                    boxSize={{ base: "100%", sm: "80%", md: "80%", lg: "80%" }}
                                    maxW="500px"
                                    objectFit="cover"
                                    borderRadius="md"
                                    shadow="md"
                                  />
                                </Box>
                              )}
                            </FormControl>
                            <Button
                              mt={4}
                              onClick={() => {
                                // Logic to save or use the selectedImage
                                console.log('Image selected:', selectedImage);
                              }}
                            >
                              Save Image
                            </Button>
                          </>
                        );
                      case 'submit':
                        return (
                          <Button key={field.id} type="submit" colorScheme="teal" mt={4} mb={4}>
                            {field.label || "Submit"}
                          </Button>
                        );
                      case 'reset':
                        return (
                          <Button key={field.id} type="reset" colorScheme="red" mt={4} mb={4} onClick={handleReset}>
                            {field.label || "Reset"}
                          </Button>
                        );
                      default:
                        return null;
                    }
                  })}
                  {/* <Button colorScheme="teal" type="submit">Submit</Button> */}
                </form>
              </Box>
            </Box>
          </Box>

          {/* Field List & Field Editor */}
          <Box p={4}>
            <Heading size="md" mb={4}>Field Editor</Heading>
            <VStack align="stretch" spacing={3}>
              {fields.map(field => (
                <Box key={field.id} p={3} borderWidth="1px" borderRadius="md" bg="white">
                  <HStack justifyContent="space-between">
                    <Text>{field.label} ({field.type})</Text>
                    <HStack>

                      <Tooltip label="Move Up">
                        <IconButton
                          aria-label="Move Up"
                          icon={<MdArrowUpward />}
                          size="sm"
                          colorScheme="teal"
                          onClick={() => moveField(field.id, 'up')}
                          isDisabled={fields.findIndex(f => f.id === field.id) === 0}
                        />
                      </Tooltip>
                      <Tooltip label="Move Down">
                        <IconButton
                          aria-label="Move Down"
                          icon={<MdArrowDownward />}
                          size="sm"
                          colorScheme="teal"
                          onClick={() => moveField(field.id, 'down')}
                          isDisabled={fields.findIndex(f => f.id === field.id) === fields.length - 1}
                        />
                      </Tooltip>

                      <Button size="sm" onClick={() => selectField(field)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => removeField(field.id)}>Delete</Button>
                    </HStack>
                  </HStack>
                </Box>
              ))}
              <Button
                mt={4}
                colorScheme="blue"
                onClick={handleSaveForm}
              >
                Save Form
              </Button>
            </VStack>

            {/* Form Title, Description, and Event Date Time Editor */}
            <Box mt={8}>
              <Heading size="md" mb={4}>Form Settings</Heading>
              <FormControl mb={4}>
                <FormLabel>Form Title</FormLabel>
                <Input
                  placeholder="Enter Form Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Form Description</FormLabel>
                <Textarea
                  placeholder="Enter Form Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={6}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Event Date & Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={eventDateTime}
                  onChange={(e) => setEventDateTime(e.target.value)}
                />
              </FormControl>
            </Box>

            {/* Field Details Editor */}
            {selectedField ? (
              <Box mt={8}>
                <Heading size="md" mb={4}>Edit Field</Heading>
                <FormControl mb={4}>
                  <FormLabel>Label</FormLabel>
                  <Input
                    name="label"
                    value={selectedField.label}
                    onChange={handleFieldChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>Placeholder</FormLabel>
                  <Input
                    name="placeholder"
                    value={selectedField.placeholder}
                    onChange={handleFieldChange}
                  />
                </FormControl>
                {['select', 'radio', 'checkbox'].includes(selectedField.type) && (
                  <>
                    <FormControl mb={4}>
                      <FormLabel>Options</FormLabel>
                      {selectedField.options.map((option, index) => (
                        <HStack key={index} spacing={2} mb={2}>
                          <Input
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                          />
                          <Button size="sm" colorScheme="red" onClick={() => removeOption(index)}>Remove</Button>
                        </HStack>
                      ))}
                      <Button size="sm" colorScheme="blue" onClick={addOption}>Add Option</Button>
                    </FormControl>
                  </>
                )}
                <FormControl mb={4}>
                  <FormLabel>Required</FormLabel>
                  <Switch
                    name="required"
                    isChecked={selectedField.required}
                    onChange={handleFieldChange}
                  />
                </FormControl>
                <HStack spacing={4}>
                  <Button colorScheme="teal" onClick={saveChanges}>Save</Button>
                  <Button ml={2} onClick={() => setSelectedField(null)}>Cancel</Button>
                  <Button ml={2} colorScheme="red" onClick={() => removeField(selectedField.id)}>Delete Field</Button>
                </HStack>
              </Box>
            ) : (
              <Text>Select a field to edit</Text>
            )}
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
