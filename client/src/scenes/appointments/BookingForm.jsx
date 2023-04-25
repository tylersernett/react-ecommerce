import { React, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { shades } from '../../theme';
import { Formik, Form, Field, useFormik } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import useMediaQuery from "@mui/material/useMediaQuery";

const BookingForm = ({ selectedDate, selectedTime, setSelectedTime }) => {
    const formRef = useRef();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isBooked, setIsBooked] = useState(false)

    const phoneRegEx = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    const validationSchema = Yup.object({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid email').required('required'),
        phone: Yup.string().matches(phoneRegEx, 'invalid phone #'),
        partySize: Yup.string().required('required')
    });

    const handleTimeChange = (event) => {
        console.log(event.target.value)
        setSelectedTime(event.target.value);
        setIsBooked(false);
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log(formRef.current.values.name);
    };

    const getFormValues = (values) => {
        return values;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            partySize: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const form = document.getElementById('mainform');
            const formData = new FormData(form);
            console.log(formData)
            values['date'] = selectedDate.format('MMMM D, YYYY');
            values['time'] = selectedTime;
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
                    setIsBooked(true)
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
        <Box display='grid' gridTemplateColumns={'1fr 1fr'} columnGap={isNonMobile ? '40px' : '15px'} gridTemplateRows='auto'>
            <Box minWidth='156px' mt='20px'>
                {selectedDate && (
                    <>
                        <Typography textAlign={'center'}>
                            {selectedDate.format('MMMM D, YYYY')}
                        </Typography>
                        <Box my='12px'>
                            <ToggleButtonGroup orientation="vertical"
                                aria-label="Time Select"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                defaultValue='12'
                                fullWidth
                                exclusive={true}
                            >
                                <ToggleButton value='12pm'>12:00pm</ToggleButton>
                                <ToggleButton value='1pm'>1:00pm</ToggleButton>
                                <ToggleButton value='2pm'>2:00pm</ToggleButton>
                                <ToggleButton value='3pm'>3:00pm</ToggleButton>
                                <ToggleButton value='4pm'>4:00pm</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                    </>
                )}
            </Box>

            <Box maxWidth='156px' mt='15px'>
                <Box>
                    <Typography variant='h3' color={shades.secondary[400]}>Info</Typography>

                    <form id='mainform'
                        // target="_blank"
                        onSubmit={formik.handleSubmit}
                    // action="https://formsubmit.co/e5dcdfe6629c8f6fabb6c8d18fcf023f"
                    // method="POST"
                    >
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_next" value="http://localhost:2000/thankyoubooked" />
                        <input type="hidden" name="AppointmentDate" value={selectedDate.format('MMMM D, YYYY') || ''} />
                        <input type="hidden" name="AppointmentTime" value={selectedTime || ''} />
                        <TextField
                            name='name'
                            // as={TextField}
                            label='Name'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

                        />
                        <TextField
                            name='email'
                            // as={TextField}
                            label='Email'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            name='phone'
                            // as={TextField}
                            label='Phone (optional)'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                        <TextField
                            name='partySize'
                            // as={TextField}
                            label='Party Size'
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            size="small"
                            value={formik.values.partySize}
                            onChange={formik.handleChange}
                            error={formik.touched.partySize && Boolean(formik.errors.partySize)}
                            helperText={formik.touched.partySize && formik.errors.partySize}
                        />
                    </form>

                </Box>
            </Box>

            {selectedTime && (
                <Box sx={{ gridColumn: 'span 2' }} >
                    <form>
                        {/* {!formik.isSubmitting && */}
                        <Button
                            mt='20px'
                            fullWidth
                            variant="contained"
                            type="submit"
                            form='mainform'
                            sx={{ backgroundColor: shades.secondary[600], '&:hover': { backgroundColor: shades.secondary[700] } }}
                            disabled={formik.isSubmitting ? true : false}
                        >
                            Book Appointment
                        </Button>
                    </form>
                    {isBooked && (
                        <Typography variant="subtitle1" color="white" mt='15px'>
                            Your appointment on {selectedDate.format('MMMM D, YYYY')} at {selectedTime} has been booked!
                            <br/>
                            A member of our team will reach out soon to confirm.
                        </Typography>
                    )}
                </Box>
            )}

        </Box>
    );
};

export default BookingForm;
