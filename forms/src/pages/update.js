import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Checkbox,
  Spinner,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { RadioGroup, Radio, Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { HStack, Tooltip, IconButton } from "@chakra-ui/react";
import axios from "axios"; // For making API requests
import { useMediaQuery } from "@chakra-ui/react";
import { api } from "../actions/api";


export const EditFormPage = () => {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [fields, setFields] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  // const [formTitle, setFormTitle] = useState('');
  // const [formDescription, setFormDescription] = useState('');
  // const [eventDateTime, setEventDateTime] = useState('');

  // Fetch form details and fields from the backend when the page loads
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`${api}/get-form/${id}`);
        const formData = response.data;
        setFormDetails({
          id:formData._id,
          title: formData.title,
          description: formData.description,
          eventDateTime: formData.eventDateTime,
        });
        setFields(formData.fields || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data:", error);
        setLoading(false);
      }
    };

    fetchFormData();
  }, [id]);

  // Handle adding a new field
  const addField = (newField) => {
    setFields([...fields, newField]);
  };

  // Function to handle form update
  const handleUpdateForm = async () => {
    // Validate if the formTitle is provided
    if (!formDetails.title) {
      alert('Title is required. Please enter a title for the form.');
      return; // Stop the function if the title is missing
    }
    // Check the value of formDetails.id
    console.log('Form ID:', formDetails); // Debugging

 

    const formData = {
      title: formDetails.title,
      description: formDetails.description || '', // Optional, default to empty string if not provided
      eventDateTime: formDetails.eventDateTime || null, // Optional, default to null if not provided
      fields,
    };

    // Show confirmation alert before updating
    const confirmed = window.confirm('Are you sure you want to update this form?');
    if (confirmed) {
      try {
        const res = await axios.put(`${api}/edit-form/${formDetails.id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 200) {
          alert('Form updated successfully!');
          // Optionally, navigate to a different page or update the UI to show the updated form
        } else {
          alert('Failed to update form. Please try again.');
          // Handle errors appropriately, e.g., display error messages
        }
      } catch (error) {
        if (error.response) {
          console.error('Error updating form:', error.response.data);
          alert(`Failed to update form: ${error.response.data.message || 'Please try again.'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('No response from the server. Please check your internet connection and try again.');
        } else {
          console.error('Error updating form:', error.message);
          alert('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  // Handle deleting a field
  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Handle editing a field
  // const editField = (field) => {
  //   setEditMode(true);
  //   setCurrentField(field);
  // };

  // Save field after editing
  const saveField = (updatedField) => {
    setFields(fields.map((field) => (field.id === updatedField.id ? updatedField : field)));
    setEditMode(false);
    setCurrentField(null);
  };

  // Update form settings (title, description, event date/time)
  const updateFormDetails = (updatedDetails) => {
    setFormDetails(updatedDetails);
  };

  if (loading) {
    return (
      <Box p={5} textAlign="center" background="linear-gradient(to right, #6a11cb, #2575fc)" color="white">
        <Spinner size="xl" />
        <Heading size="md" mt={4}>Loading Form Data...</Heading>
      </Box>
    );
  }

  if (!formDetails || !fields) {
    return (
      <Box p={5} textAlign="center" background="linear-gradient(to right, #6a11cb, #2575fc)" color="white">
        <Heading size="md" mt={4}>Error loading form data</Heading>
      </Box>
    );
  }

  return (
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
          Form Editor
        </Heading>
      </Box>

      <Flex flexDirection={isSmallScreen ? "column" : "row"}>
        {/* Left Side: Form Builder */}
        <Box flex="1" p={4} mr={isSmallScreen ? 0 : 4}>
          <Stack spacing={5}>
            {/* Form Settings Section */}
            <FormSettings formDetails={formDetails} updateFormDetails={updateFormDetails} />

            {/* Add Field Section */}
            <AddField addField={addField} />

            {/* Field Editor Section */}
            <FieldEditor fields={fields} setFields={setFields} formDetails={formDetails} />
            {/* Edit Field Section (only shows when a field is in edit mode) */}
            {editMode && (
              <EditField
                field={currentField}
                saveField={saveField}
                removeField={deleteField}
              />
            )}
            {/* form updater*/}
            <HStack spacing={4} justifyContent="flex-end" mt={4}>
              <Button onClick={handleUpdateForm} colorScheme="blue">Update Form</Button>
            </HStack>
          </Stack>

        </Box>

        {/* Right Side: Form Preview */}
        <Box flex="1" p={4} background="gray.100" borderRadius="md" boxShadow="md">
          {/* Form Preview Section */}
          <FormPreview
            fields={fields}
            formTitle={formDetails.title}
            formDescription={formDetails.description}
            eventDateTime={formDetails.eventDateTime}
          />
        </Box>
      </Flex>
    </Box>
  );
};


// Form Settings Component
const FormSettings = ({ formDetails, updateFormDetails }) => {
  const [title, setTitle] = useState(formDetails.title);
  const [description, setDescription] = useState(formDetails.description);
  const [eventDateTime, setEventDateTime] = useState(formDetails.eventDateTime);

  const handleSave = () => {
    const updatedDetails = { title, description, eventDateTime };
    updateFormDetails(updatedDetails);
  };

  return (
    <Box p={4} background="gray.100" borderRadius="md" boxShadow="md">
      <Heading size="md">Form Settings</Heading>
      <FormControl mt={4}>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Event Date & Time</FormLabel>
        <Input
          type="datetime-local"
          value={eventDateTime}
          onChange={(e) => setEventDateTime(e.target.value)}
        />
      </FormControl>

      <Button onClick={handleSave} colorScheme="blue" mt={4}>
        Save Settings
      </Button>
    </Box>
  );
};

// Add Field Component
const AddField = ({ addField }) => {
  const [fieldType, setFieldType] = useState("text");
  const [label, setLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [options, setOptions] = useState([""]);

  const handleAddField = () => {
    const newField = {
      id: Date.now().toString(),
      type: fieldType,
      label,
      placeholder,
      options: fieldType === "select" || fieldType === "radio" ? options : [],
    };
    addField(newField);
    setLabel("");
    setPlaceholder("");
    setOptions([""]);
  };

  return (
    <Box p={4} background="gray.100" borderRadius="md" boxShadow="md">
      <Heading size="md">Add New Field</Heading>
      <FormControl mt={4}>
        <FormLabel>Field Type</FormLabel>
        <Select value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
          <option value="select">Select</option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Label</FormLabel>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter field label"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Placeholder</FormLabel>
        <Input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Enter placeholder"
        />
      </FormControl>

      {fieldType === "select" || fieldType === "radio" ? (
        <FormControl mt={4}>
          <FormLabel>Options</FormLabel>
          {options.map((option, index) => (
            <Input
              key={index}
              value={option}
              onChange={(e) =>
                setOptions(options.map((opt, i) => (i === index ? e.target.value : opt)))
              }
              placeholder={`Option ${index + 1}`}
              mb={2}
            />
          ))}
          <Button onClick={() => setOptions([...options, ""])} mt={2}>
            Add Option
          </Button>
        </FormControl>
      ) : null}

      <Button onClick={handleAddField} colorScheme="blue" mt={4}>
        Add Field
      </Button>
    </Box>
  );
};

const FieldEditor = ({ fields, setFields, formDetails }) => {
  const [editingFieldId, setEditingFieldId] = useState(null);
  // const [formTitle, setFormTitle] = useState('');
  // const [formDescription, setFormDescription] = useState('');
  // const [eventDateTime, setEventDateTime] = useState('');
  const moveField = (id, direction) => {
    const index = fields.findIndex(field => field.id === id);
    const newFields = [...fields];

    if (direction === 'up' && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    } else if (direction === 'down' && index < fields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    }

    setFields(newFields);
  };

  const handleEditField = (field) => {
    setEditingFieldId(field.id);
  };
  // const handleDeleteField = (id) => {
  //   setFields(fields.filter(field => field.id !== id));
  // };
  const saveField = (updatedField) => {
    const updatedFields = fields.map(field => (field.id === updatedField.id ? updatedField : field));
    setFields(updatedFields);
    setEditingFieldId(null); // Exit editing mode
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
    if (editingFieldId === id) {
      setEditingFieldId(null); // Reset editing state if removed
    }
  };
  const saveEditedField = (updatedField) => {
    saveField(updatedField); // Call the save function with the updated field
    setEditingFieldId(null); // Reset the editing field ID after saving
  };

  return (
    <Box mb={5}>
      <Heading size="md" mb={4}>Field Editor</Heading>
      {fields.length === 0 ? (
        <Text>No fields available.</Text>
      ) : (
        fields.map((field) => (
          <Box key={field.id} p={3} border="1px solid" borderRadius="md" mb={3} background="white" boxShadow="md">
            {editingFieldId === field.id ? (
              <EditField field={field} saveField={saveEditedField} removeField={removeField} />
            ) : (
              <Flex justify="space-between" align="center">
                <Box>
                  <Text><b>Label:</b> {field.label}</Text>
                  <Text><b>Type:</b> {field.type}</Text>
                </Box>
                <HStack spacing={2}>
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
                  <Button colorScheme="yellow" onClick={() => handleEditField(field)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => removeField(field.id)} ml={2}>Delete</Button>
                </HStack>
              </Flex>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

// Edit Field Component
const EditField = ({ field, saveField, removeField }) => {
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder);
  const [options, setOptions] = useState(field.options);

  const handleSave = () => {
    const updatedField = { ...field, label, placeholder, options };
    saveField(updatedField);
  };

  return (
    <Box mb={5} p={4} background="white" borderRadius="md" boxShadow="md">
      <Heading size="md">Edit Field</Heading>
      <FormControl>
        <FormLabel>Label</FormLabel>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Placeholder</FormLabel>
        <Input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
      </FormControl>

      <Button onClick={handleSave} colorScheme="blue" mt={4}>Save Changes</Button>
      <Button onClick={() => removeField(field.id)} colorScheme="red" mt={4} ml={2}>Remove Field</Button>
    </Box>
  );
};

const FormPreview = ({ fields, formTitle, formDescription, eventDateTime }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
  };

  return (
    <Box mb={5}>
      <Heading size="md">Form Preview</Heading>
      <Box border="1px solid" borderRadius="md" p={3} background="gray.100" boxShadow="md">
        {formTitle && <Heading size="lg" mb={2}>{formTitle}</Heading>}

        {formDescription && (
          <>
            <Text mt={4} fontWeight="bold">Description:</Text>
            <Box p={4} bg="gray.200" borderRadius="md" mt={2}>
              <Text whiteSpace="pre-wrap">{formDescription}</Text>
            </Box>
          </>
        )}

        {eventDateTime && (
          <Text fontWeight="bold" mb={4}>
            Event Date & Time: {new Date(eventDateTime).toLocaleString()}
          </Text>
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
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  {selectedImage && (
                    <Box mt={4} display="flex" justifyContent="center" alignItems="center">
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
      </Box>
    </Box>
  );
};
