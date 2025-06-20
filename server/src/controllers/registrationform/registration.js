import express from 'express';
import multer from 'multer';
import { ObjectId } from 'mongodb';
import { configureGridFsStorage } from '../../gridFsStorage.js'; 
import { db, bucket, url } from '../../db.js'; 
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const mongoUrl = url; 

const storage = configureGridFsStorage(mongoUrl, "photos");

const upload = multer({ storage });


router.post('/save-form', upload.single('image'), async (req, res) => {
  try {
    const { title, description, eventDateTime, fields } = req.body;

    // Check if title is provided
    if (!title) {
      return res.status(400).json({ message: 'Title is required. Please enter a title for the form.' });
    }

    // Parse fields if it's a string (which happens when sent via form-data)
    const parsedFields = typeof fields === 'string' ? JSON.parse(fields) : fields;

    // Generate unique field IDs for each field
    const newFields = parsedFields.map(field => ({
      ...field,
      fieldId: uuidv4(),
    }));

    // Store image if uploaded
    const imageFile = req.file ? req.file.filename : null;

    // Create form document with the image field
    const formDocument = {
      title,
      description,
      eventDateTime: new Date(eventDateTime),
      fields: newFields,
      imageFile, // Add image file to the form document
    };

    // Insert form into the 'forms' collection
    const collection = db.collection("forms");
    const result = await collection.insertOne(formDocument);

    // Send success response
    res.status(201).json({ message: 'Form saved successfully!', formId: result.insertedId });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ message: 'Error saving form', error: err.message || err });
  }
});



router.get('/formadder', async (req, res) => {
  try {
    const collection = db.collection("registrations");

    const forms = await collection.find().toArray();

    res.status(200).json(forms);
  } catch (err) {
    console.error('Error retrieving forms:', err);
    res.status(500).json({ message: 'Error retrieving forms', error: err.message || err });
  }
});




router.put('/edit-form/:id', async (req, res) => {
  try {
    const { title, description, eventDateTime, fields } = req.body;
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid form ID.' });
    }

    const collection = db.collection("forms");
    const objectId = new ObjectId(id);

    const existingForm = await collection.findOne({ _id: objectId });
    if (!existingForm) {
      return res.status(404).json({ message: 'Form not found.' });
    }

    const updatedFields = fields.map(field => ({
      ...field,
      fieldId: field.fieldId || uuidv4(),
    }));

    const filteredFields = existingForm.fields.filter(existingField =>
      updatedFields.some(updatedField => updatedField.fieldId === existingField.fieldId)
    );

    const finalFields = [...filteredFields, ...updatedFields.filter(updatedField =>
      !filteredFields.some(filteredField => filteredField.fieldId === updatedField.fieldId)
    )];

    const updatedFormDocument = {
      title,
      description,
      eventDateTime: new Date(eventDateTime),
      fields: finalFields,
    };

    await collection.updateOne({ _id: objectId }, { $set: updatedFormDocument });

    res.status(200).json({ message: 'Form updated successfully!' });
  } catch (err) {
    console.error('Error editing form:', err);
    res.status(500).json({ message: 'Error editing form', error: err.message || err });
  }
});

router.get('/get-submission-by-formId/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid form ID.' });
    }

    const collection = db.collection("forms");
    const form = await collection.findOne({ _id: new ObjectId(id) });

    if (!form) {
      return res.status(404).json({ message: 'Form not found.' });
    }

    res.status(200).json(form);
  } catch (err) {
    console.error('Error fetching form:', err);
    res.status(500).json({ message: 'Error fetching form', error: err.message || err });
  }
});

router.post('/submit-values', upload.single('image'), async (req, res) => {
  try {
    const { formId, submittedValues } = req.body;

    // Validate inputs
    if (!formId || !submittedValues) {
      return res.status(400).json({ message: 'Form ID and submitted values are required.' });
    }

    if (!ObjectId.isValid(formId)) {
      return res.status(400).json({ message: 'Invalid form ID' });
    }

  
    const imageFile = req.file ? req.file.filename : null;

    const collection = db.collection('forms.responses');

    const parsedValues = JSON.parse(submittedValues).map(field => ({
      fieldId: field.fieldId,
      value: field.value,
    }));

    const submissionDocument = {
      formId: new ObjectId(formId),
      submittedValues: parsedValues,
      imageFile,
      submissionDate: new Date(),
    };

    await collection.insertOne(submissionDocument);

    res.status(201).json({ message: 'Form values submitted successfully!', submissionDocument });
  } catch (err) {
    console.error('Error submitting form values:', err);
    res.status(500).json({ message: 'Error submitting form values', error: err.message || err });
  }
});




router.get('/get-form/:formId', async (req, res) => {
  try {
    const { formId } = req.params;
    
    if (!ObjectId.isValid(formId)) {
      return res.status(400).json({ message: 'Invalid form ID' });
    }

    const collection = db.collection('registrations');
    const submissions = await collection.find({ _id: new ObjectId(formId) }).toArray();

    if (!submissions.length) {
      return res.status(404).json({ message: 'No submissions found for the given form ID' });
    }

    const submission = submissions[0];

    if (submission.imageFile) {
      const file = await bucket.find({ _id: new ObjectId(submission.imageFile) }).toArray();
      if (!file || !file.length) {
        return res.status(404).json({ message: 'Image file not found' });
      }

      bucket.openDownloadStream(new ObjectId(submission.imageFile)).pipe(res);
    } else {
      res.status(200).json(submission);
    }
  } catch (err) {
    console.error('Error retrieving submissions:', err);
    res.status(500).json({ message: 'Error retrieving submissions', error: err.message || err });
  }
});

router.get('/responses/:formId', async (req, res) => {
  try {
    const { formId } = req.params;

    if (!ObjectId.isValid(formId)) {
      return res.status(400).json({ message: 'Invalid form ID' });
    }

    const collection = db.collection('forms.responses');
    const submissions = await collection.find({ formId: new ObjectId(formId) }).toArray();

    if (!submissions.length) {
      return res.status(404).json({ message: 'No submissions found for the given form ID' });
    }

    // Optional: handle image streaming (if you want only one streamed image)
    const withImage = submissions.find((submission) => submission.imageFile);
    if (withImage && withImage.imageFile) {
      const file = await bucket.find({ _id: new ObjectId(withImage.imageFile) }).toArray();
      if (!file || !file.length) {
        return res.status(404).json({ message: 'Image file not found' });
      }

      return bucket.openDownloadStream(new ObjectId(withImage.imageFile)).pipe(res);
    }

    // Else return all responses normally
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error retrieving responses:', err);
    res.status(500).json({ message: 'Error retrieving responses', error: err.message || err });
  }
});

export default router;
