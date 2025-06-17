import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Spinner, Text, useToast } from '@chakra-ui/react';
import { DynamicForm } from './formcomponent';
import { api } from '../actions/api';
const FormViewer = () => {
  const { formId } = useParams(); // Extract formId from the URL
  const [form, setForm] = useState(null); // State to store form data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const toast = useToast(); // Toast for notifications

  // Fetch the form from backend using formId
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${api}/get-form/${formId}`);
        console.log('Form data:', response.data); // Log the response data
        setForm(response.data); // Set the form data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching form:', err); // Log the error
        setError('Failed to load the form.');
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);
  
  // Check if loading, error, and form are being handled correctly
  if (loading) {
    console.log('Loading form...');
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Spinner size="xl" />
      </Box>
    );
  }
  

  // If form is loaded, display it using DynamicForm component
  return (
    <Box p={4}>
      {form ? (
        <DynamicForm form={form} /> // Render dynamic form based on fetched data
      ) : (
        <Text>No form data available for this ID.</Text>
      )}
    </Box>
  );
};

export default FormViewer;
