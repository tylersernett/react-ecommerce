import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { shades } from '../../theme';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const BookingForm = () => {
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        partySize: ''
    };

    const phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid email').required('required'),
        phone: Yup.string().matches(phoneRegEx, 'invalid phone #'),
        partySize: Yup.string().required('required')
    });

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box>
            <Typography variant='h3' color={shades.secondary[400]}>Info</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
            // onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form
                        // target="_blank"
                        onSubmit={handleSubmit}
                        action="https://formsubmit.co/e5dcdfe6629c8f6fabb6c8d18fcf023f"
                        method="POST"
                    >
                        <Field
                            name='name'
                            as={TextField}
                            label='Name'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            hiddenLabel
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
                            size="small"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            name='phone'
                            as={TextField}
                            label='Phone (optional)'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                        <Field
                            name='partySize'
                            as={TextField}
                            label='Party Size'
                            fullWidth
                            margin='normal'
                            // multiline
                            // rows={4}
                            variant='outlined'
                            size="small"
                            error={touched.partySize && Boolean(errors.partySize)}
                            helperText={touched.partySize && errors.partySize}
                        />
                        <input type="hidden" name="_next" value="http://localhost:2000/thankyoubooked" />
                        
                        
                        {/* <Button
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
                            Book Appointment
                        </Button> */}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default BookingForm;
