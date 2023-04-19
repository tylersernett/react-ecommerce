import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { shades } from '../theme';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ContactForm = () => {
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid email').required('required'),
        subject: Yup.string().required('required'),
        message: Yup.string().required('required')
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        // Replace with your own code to send the form data to a server or API
        resetForm();
    };

    return (
        <Box gap='15px'>
            <Typography variant='h3'>Contact Form</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Field
                            name='name'
                            as={TextField}
                            label='Name'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <Field
                            name='email'
                            as={TextField}
                            label='Email'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            name='subject'
                            as={TextField}
                            label='Subject'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            error={touched.subject && Boolean(errors.subject)}
                            helperText={touched.subject && errors.subject}
                        />
                        <Field
                            name='message'
                            as={TextField}
                            label='Message'
                            fullWidth
                            margin='normal'
                            multiline
                            rows={4}
                            variant='outlined'
                            error={touched.message && Boolean(errors.message)}
                            helperText={touched.message && errors.message}
                        />
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{
                                mt: 2,
                                backgroundColor: shades.neutral[700],
                                '&:hover': {
                                    backgroundColor: shades.secondary[600]
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default ContactForm;
