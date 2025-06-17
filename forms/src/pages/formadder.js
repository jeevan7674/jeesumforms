import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Text, IconButton, Menu, MenuButton, MenuList, MenuItem,
  Flex, Heading, SimpleGrid, useBreakpointValue, Spinner, useToast,
  Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useDisclosure, Input
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';
import { QRCodeCanvas } from 'qrcode.react';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebookF, FaWhatsapp, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { useCallback } from 'react';
import { api } from '../actions/api';

const FormCard = React.memo(({ form, onEdit, onDelete, onGenerateQR, onShare, onViewResponses }) => {
  const menuSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const toast = useToast(); // Initialize Chakra UI toast for feedback


  const [isVisible, setIsVisible] = useState(form.visibility);

  const handleToggleVisibility = async () => {    
    try {
      const newVisibility = !isVisible; // Toggle visibility state
      const response = await axios.patch(`${api}/formadder/${form._id}`, { visibility: newVisibility });
  
      if (response.status === 200) {
        setIsVisible(newVisibility); // Update state with new visibility value
        
        // Show success toast
        toast({
          title: 'Visibility Updated',
          description: `The form is now ${newVisibility ? 'visible' : 'hidden'}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update visibility');
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      
      // Show error toast
      toast({
        title: 'Error',
        description: 'Failed to update form visibility.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };



  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      shadow="lg"
      bg="rgba(255, 255, 255, 0.8)"
      _hover={{
        bg: 'rgba(255, 255, 255, 0.9)',
        transform: 'scale(1.03)',
        transition: '0.2s',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={{ base: '100%', sm: '300px', md: '400px', lg: '450px' }}
      height="auto"
      minHeight="250px"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="md" fontWeight="bold" color="black" noOfLines={1}>
          {form.title}
        </Text>
        <Switch
          colorScheme="teal"
          isChecked={isVisible}
          onChange={handleToggleVisibility}
          size="lg"
          aria-label="Visibility toggle"
        />
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FiMoreVertical />}
            variant="outline"
            color="black"
            _hover={{ bg: 'gray.200' }}
            _active={{ bg: 'gray.300' }}
          />
          <MenuList
            size={menuSize}
            bg="white"
            width="150px"
            maxH="200px"
            overflowY="auto"
            boxShadow="lg"
          >
            {/* // Example usage with MenuItem */}
            <MenuItem onClick={() => onEdit(form)} color="black">Edit</MenuItem>
            {/* <MenuItem onClick={() => onAdd(form)} color="black">Add</MenuItem> */}
            <MenuItem onClick={() => onDelete(form)} color="red">Delete</MenuItem>
            <MenuItem onClick={() => onViewResponses(form)} color="black">Responses</MenuItem>
            <MenuItem onClick={() => onGenerateQR(form)} color="black">Generate QR Code</MenuItem>
            <MenuItem onClick={() => onShare(form)} color="black">Share</MenuItem>

          </MenuList>
        </Menu>
      </Flex>

      <Box flex="1" overflowY="auto" bg="gray.50" p={3} borderRadius="md" color="black" maxH="150px">
        <Text fontSize="sm" whiteSpace="pre-wrap">
          {form.description || 'No description available.'}
        </Text>
      </Box>
      <Text fontSize="sm" mt={2} color="gray.600" textAlign="right">
        Event Date: {form.eventDateTime ? new Date(form.eventDateTime).toLocaleString() : 'N/A'}
      </Text>
    </Box>
  );
});

export const FormAdderPage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const [selectedForm, setSelectedForm] = useState(null);
  const [formToDelete, setFormToDelete] = useState(null);
  const { isOpen: isQRModalOpen, onOpen: onQRModalOpen, onClose: onQRModalClose } = useDisclosure();
  const { isOpen: isShareModalOpen, onOpen: onShareModalOpen, onClose: onShareModalClose } = useDisclosure();
  const qrRef = useRef(null); // Reference for the QR code canvas
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const navigate = useNavigate(); // Initialize useNavigate

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


  const handleCreateForm = useCallback(() => {
    navigate('/createform'); // Navigate to form creation page
  }, [navigate]);

  const handleEdit = useCallback((form) => {
    navigate(`/editform/${form._id}`);
  }, [navigate]);

  // const handleAdd = (form) => {
  //   toast({ title: `${form.title} added!`, status: 'success', duration: 2000, isClosable: true });
  // };

  const handleDelete = (form) => {
    setFormToDelete(form); // Set the form to be deleted
    onDeleteModalOpen(); // Open the confirmation modal
  };
  
  const confirmDelete = async () => {
    if (!formToDelete) return; // Ensure there's a form selected for deletion

    try {
        const response = await axios.delete(`${api}/form/${formToDelete._id}`);
        
        // Log the response for debugging
        console.log('Delete Response:', response);

        // Check if the deletion was successful
        if (response.status === 200) {
            setForms(forms.filter(f => f._id !== formToDelete._id)); // Remove the form from state
            toast({
                title: `${formToDelete.title} deleted`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } else {
            throw new Error(response.data.message || 'Deletion failed'); // Trigger error handling if status is not 200
        }
    } catch (error) {
        console.error('Delete error:', error); // Log the error for debugging
        toast({
            title: `Failed to delete ${formToDelete.title}`,
            status: 'error',
            duration: 2000,
            isClosable: true,
        });
    } finally {
        onDeleteModalClose(); // Close the confirmation modal
    }
};


  const handleGenerateQR = (form) => {
    setSelectedForm(form);
    onQRModalOpen();
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${selectedForm.title}_QR_Code.png`;
      link.click();
    }
  };

  const handleShare = (form) => {
    setSelectedForm(form);
    onShareModalOpen();
  };

  const copyLinkToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed to copy link!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleViewResponses = (form) => {
    navigate(`/responses/${form._id}`); // Redirect to ResponsesPage
    console.log(form._id);
    
};

  const filteredForms = forms.filter(form =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={6} minH="100vh" bg="linear-gradient(125deg, #1f5edb, #fa3fc8)" color="white">
      <Heading mb={6} textAlign="center" size="lg">Forms List</Heading>
      {/* Search and Action Buttons */}
      <Flex justifyContent="space-between" mb={4}>
        <Input
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          color="black"
          width="70%"
        />
        <Flex gap={2}>
          <Button colorScheme="teal" onClick={handleCreateForm}>
            Create Form
          </Button>
          <Button colorScheme="blue" onClick={fetchForms}>
            Refresh Forms
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" minHeight="200px">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : error ? (
        <Text color="red.300" textAlign="center">{error}</Text>
      ) : forms.length === 0 ? (
        <Text textAlign="center">No forms available</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={4}>
          {filteredForms.map((form) => (
            <FormCard
              key={form._id}
              form={form}
              onEdit={handleEdit}
              // onAdd={handleAdd}
              onDelete={handleDelete}
              onGenerateQR={handleGenerateQR}
              onShare={handleShare}
              onViewResponses={handleViewResponses} // Pass the new function
            />
          ))}
        </SimpleGrid>
      )}



      {/* QR Code Modal */}
      <Modal isOpen={isQRModalOpen} onClose={onQRModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code for {selectedForm?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedForm && (
              <Flex justify="center" ref={qrRef}>
                <QRCodeCanvas value={`${window.location.origin}/form/${selectedForm._id}`} size={200} />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={downloadQRCode}>
              Download QR Code
            </Button>
            <Button colorScheme="blue" onClick={onQRModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this form? This action cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDelete} mr={3}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} onClose={onShareModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share {selectedForm?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedForm && (
              <Flex direction="column" alignItems="center">
                <Text mb={4}>Share via:</Text>
                <Flex
                  direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens
                  wrap="wrap"
                  gap={4}
                  justify="center"
                >
                  <FacebookShareButton url={`${window.location.origin}/form/${selectedForm._id}`}>
                    <Button leftIcon={<FaFacebookF />} colorScheme="facebook">Facebook</Button>
                  </FacebookShareButton>
                  <WhatsappShareButton url={`${window.location.origin}/form/${selectedForm._id}`}>
                    <Button leftIcon={<FaWhatsapp />} colorScheme="whatsapp">WhatsApp</Button>
                  </WhatsappShareButton>
                  <TwitterShareButton url={`${window.location.origin}/form/${selectedForm._id}`}>
                    <Button leftIcon={<FaTwitter />} colorScheme="twitter">Twitter</Button>
                  </TwitterShareButton>
                  <LinkedinShareButton url={`${window.location.origin}/form/${selectedForm._id}`}>
                    <Button leftIcon={<FaLinkedin />} colorScheme="linkedin">LinkedIn</Button>
                  </LinkedinShareButton>
                  <Button
                    onClick={() => window.open(`https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/form/${selectedForm._id}`)}`, '_blank')}
                    leftIcon={<FaInstagram />}
                  >
                    Instagram
                  </Button>
                  <Button onClick={() => copyLinkToClipboard(`${window.location.origin}/form/${selectedForm._id}`)} leftIcon={<FiMoreVertical />}>
                    Copy Link
                  </Button>
                </Flex>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onShareModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
