import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  InputGroup,
  Input,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';
import { SearchIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export const ResponsesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      setLoading(true);
      try {
        const formResponse = await axios.get(`${api}/get-form/${id}`);
        if (formResponse.data) {
          setFormFields(formResponse.data.fields);
          setFormName(formResponse.data.title);
        }

        const response = await axios.get(`${api}/responses/${id}`);
        if (Array.isArray(response.data)) {
          setResponses(response.data);
        } else {
          setResponses([]);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch form or responses.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormAndResponses();
  }, [id]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredResponses = responses.filter((response) =>
    response.submittedValues.some((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm)
    )
  );

  const filteredFields = formFields.filter(
    (field) => field.type !== 'submit' && field.type !== 'reset'
  );

  const exportToExcel = () => {
    const data = filteredResponses.map((response) => {
      const row = {
        'Submission Date': new Date(response.submissionDate).toLocaleString(),
      };
      filteredFields.forEach((field) => {
        const submittedValue = response.submittedValues.find(
          (item) => String(item.fieldId) === String(field.id)
        );
        row[field.label] = submittedValue
          ? Array.isArray(submittedValue.value)
            ? submittedValue.value.join(', ')
            : submittedValue.value || 'No value provided'
          : 'No value provided';
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');
    XLSX.writeFile(workbook, `${formName}-responses.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`${formName} Responses`, 10, 10);
    let yOffset = 20;
    
    filteredResponses.forEach((response) => {
      doc.text(`Submission Date: ${new Date(response.submissionDate).toLocaleString()}`, 10, yOffset);
      yOffset += 10;
      filteredFields.forEach((field) => {
        const submittedValue = response.submittedValues.find(
          (item) => String(item.fieldId) === String(field.id)
        );
        const value = submittedValue
          ? Array.isArray(submittedValue.value)
            ? submittedValue.value.join(', ')
            : submittedValue.value || 'No value provided'
          : 'No value provided';
        doc.text(`${field.label}: ${value}`, 10, yOffset);
        yOffset += 10;
      });
      yOffset += 10;
    });

    doc.save(`${formName}-responses.pdf`);
  };

  return (
    <Box
      p={4}
      bgGradient="linear(125deg, #1f5edb, #fa3fc8)"
      minHeight="100vh"
      color="white"
    >
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          <Flex mb={4} alignItems="center" justifyContent="space-between">
            <Button onClick={() => navigate('/form')} colorScheme="whiteAlpha">
              Back to Forms
            </Button>

            <Text fontSize="3xl" fontWeight="extrabold" textAlign="center">
              {formName} Responses
            </Text>

            <HStack spacing={4}>
              <Button colorScheme="whiteAlpha" onClick={exportToExcel}>
                Export to Excel
              </Button>
              <Button colorScheme="whiteAlpha" onClick={exportToPDF}>
                Export to PDF
              </Button>
            </HStack>
          </Flex>

          <InputGroup mb={4}>
            <Input
              placeholder="Search responses"
              value={searchTerm}
              onChange={handleSearch}
              bg="whiteAlpha.800"
              color="black"
            />
            <InputRightElement>
              <SearchIcon color="gray.500" />
            </InputRightElement>
          </InputGroup>

          {filteredResponses.length > 0 ? (
            <Table variant="striped" colorScheme="blackAlpha" size="lg">
              <Thead>
                <Tr>
                  <Th color="white">Submission Date</Th>
                  {filteredFields.map((field) => (
                    <Th key={field.id} color="white">{field.label}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {filteredResponses.map((response) => (
                  <Tr key={response._id}>
                    <Td>{new Date(response.submissionDate).toLocaleString()}</Td>
                    {filteredFields.map((field) => {
                      const submittedValue = response.submittedValues.find(
                        (item) => String(item.fieldId) === String(field.id)
                      );
                      return (
                        <Td key={field.id}>
                          {submittedValue
                            ? Array.isArray(submittedValue.value)
                              ? submittedValue.value.join(', ')
                              : submittedValue.value || 'No value provided'
                            : 'No value provided'}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text>No responses found.</Text>
          )}
        </>
      )}
    </Box>
  );
};
