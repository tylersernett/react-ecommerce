import { React, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { shades } from '../theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useMediaQuery from "@mui/material/useMediaQuery";

const ContactForm = () => {
    const [isSent, setIsSent] = useState(false)
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const validationSchema = Yup.object({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid email').required('required'),
        subject: Yup.string().required('required'),
        message: Yup.string().required('required')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch('https://formsubmit.co/ajax/7793f1e72a9025f1888edee332bccdef', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    //success redirect
                    formik.resetForm();
                    setIsSent(true)
                    // window.location.href = '/thankyoubooked'
                    //return response.text();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('There was a problem with the form submission:', error);
                });
        },
    });

    return (
        <Box>
            <Typography variant='h3' color={shades.secondary[400]}>Contact Form</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name='name'
                    label='Name'
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    name='email'
                    label='Email'
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email} />
                <TextField
                    name='subject'
                    label='Subject'
                    fullWidth
                    margin='normal'
                    variant='outlined'
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject} />
                <TextField
                    name='message'
                    label='Message'
                    fullWidth
                    margin='normal'
                    multiline
                    rows={4}
                    variant='outlined'
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message} />
                <input type="hidden" name="_next" value="http://localhost:2000/thankyou" />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ backgroundColor: shades.secondary[600], '&:hover': { backgroundColor: shades.secondary[700] } }}
                    disabled={formik.isSubmitting}
                    fullWidth={!isNonMobile}
                >
                    Submit
                </Button>
            </form>

            {isSent && (
                <Typography variant="subtitle1" color="white" mt='15px'>
                    Your message has been received!
                    <br />
                    A member of our team will reach out soon.
                </Typography>
            )}

        </Box>
    );
};

export default ContactForm;