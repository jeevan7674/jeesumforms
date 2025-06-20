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
  const [allHeaders, setAllHeaders] = useState([]);

  useEffect(() => {
    const fetchFormAndResponses = async () => {
      setLoading(true);
      try {
        const formResponse = await axios.get(`${api}/get-form/${id}`);
        console.log('Form data:', formResponse.data); // Log the form data
        
        
        const form = formResponse.data;
        setFormFields(form.fields || []);
        setFormName(form.title || 'Untitled Form');

        const response = await axios.get(`${api}/responses/${id}`);
        console.log('Responses:', response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setResponses(data);

        // Build unique field headers from submissions
        const fieldSet = new Set();
        data.forEach((res) =>
          res.submittedValues?.forEach((item) => fieldSet.add(item.fieldId))
        );

        const dynamicHeaders = Array.from(fieldSet).map((fieldId) => {
          const match = form.fields?.find((f) => String(f.id) === String(fieldId));
          return {
            id: fieldId,
            label: match?.label || `Field ${fieldId}`,
          };
        });

        setAllHeaders(dynamicHeaders);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
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
    response.submittedValues?.some((item) =>
      JSON.stringify(item.value || '')
        .toLowerCase()
        .includes(searchTerm)
    )
  );

  const exportToExcel = () => {
    const data = filteredResponses.map((response, index) => {
      const row = {
        'S.No': index + 1,
        'Submission Date': new Date(response.submissionDate).toLocaleString(),
      };
      allHeaders.forEach((field) => {
        const submitted = response.submittedValues?.find(
          (item) => String(item.fieldId) === String(field.id)
        );
        row[field.label] = submitted
          ? Array.isArray(submitted.value)
            ? submitted.value.join(', ')
            : submitted.value || 'No value provided'
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
    doc.setFontSize(12);
    doc.text(`${formName} Responses`, 10, 10);
    let yOffset = 20;

    filteredResponses.forEach((response, index) => {
      doc.text(`S.No: ${index + 1}`, 10, yOffset);
      yOffset += 10;
      doc.text(
        `Submission Date: ${new Date(response.submissionDate).toLocaleString()}`,
        10,
        yOffset
      );
      yOffset += 10;

      allHeaders.forEach((field) => {
        const submitted = response.submittedValues?.find(
          (item) => String(item.fieldId) === String(field.id)
        );
        const value = submitted
          ? Array.isArray(submitted.value)
            ? submitted.value.join(', ')
            : submitted.value || 'No value provided'
          : 'No value provided';

        doc.text(`${field.label}: ${value}`, 10, yOffset);
        yOffset += 10;
      });

      yOffset += 10;
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
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
          <Flex mb={4} justifyContent="space-between" alignItems="center">
            <Button onClick={() => navigate('/registrationform')} colorScheme="whiteAlpha">
              Back to Forms
            </Button>

            <Text fontSize="2xl" fontWeight="bold">
              {formName} Responses
            </Text>

            <HStack spacing={3}>
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
              placeholder="Search responses..."
              value={searchTerm}
              onChange={handleSearch}
              bg="whiteAlpha.800"
              color="black"
            />
            <InputRightElement>
              <SearchIcon color="gray.600" />
            </InputRightElement>
          </InputGroup>

          {filteredResponses.length > 0 ? (
            <Table variant="striped" colorScheme="blackAlpha" size="md">
              <Thead>
                <Tr>
                  <Th color="white">S.No</Th>
                  <Th color="white">Submission Date</Th>
                  {allHeaders.map((field) => (
                    <Th key={field.id} color="white">
                      {field.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {filteredResponses.map((response, index) => (
                  <Tr key={response._id}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {response.submissionDate
                        ? new Date(response.submissionDate).toLocaleString()
                        : 'N/A'}
                    </Td>
                    {allHeaders.map((field) => {
                      const submitted = response.submittedValues?.find(
                        (item) => String(item.fieldId) === String(field.id)
                      );
                      return (
                        <Td key={field.id}>
                          {submitted
                            ? Array.isArray(submitted.value)
                              ? submitted.value.join(', ')
                              : submitted.value || 'No value provided'
                            : 'No value provided'}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Text mt={4}>No responses found.</Text>
          )}
        </>
      )}
    </Box>
  );
};
