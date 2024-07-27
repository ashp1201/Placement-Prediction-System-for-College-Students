import React from 'react';
import { Button, Typography, TextField, Container, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import axios for making HTTP requests
import NavbarApp from './NavbarApp';

function Resume() {
  const formatBytesToMB = (bytes) => {
    if (bytes === 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const initialValues = {
    firstName: '',
    email: '',
    file: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    file: Yup.mixed().required('File is required'),
  });

  const onSubmit = async (values) => {
    try {
      // Create a FormData object to send the form data
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('email', values.email);
      formData.append('file', values.file);

      // Make a POST request to your backend API endpoint
      await axios.post('/send-email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <NavbarApp />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Upload Resume
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isValid, dirty, setFieldValue, values }) => (
              <Form>
                <Field name="firstName">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  id="resume-file"
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
                <label htmlFor="resume-file">
                  <Button variant="contained" component="span">
                    Choose File
                  </Button>
                </label>
                <Typography variant="body1" gutterBottom>
                  {values.file && (
                    <>Selected File: {values.file.name} - Size: {formatBytesToMB(values.file.size)}</>
                  )}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid || !dirty}
                  sx={{ mt: 2 }}
                >
                  Upload
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </>
  );
}

export default Resume;
