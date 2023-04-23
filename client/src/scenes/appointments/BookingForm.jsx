import { React, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { shades } from '../../theme';
import { Formik, Form, Field } from 'formik';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import useMediaQuery from "@mui/material/useMediaQuery";

const BookingForm = ({ selectedDate, selectedTime, setSelectedTime }) => {
    const formRef = useRef();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const initialValues = {
        // date: '',
        // time: '',
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

    const handleTimeChange = (event) => {
        console.log(event.target.value)
        setSelectedTime(event.target.value);
        // setIsBooked(false);
    };

    const handleSubmit = (e) => {
        //e.preventDefault();
        console.log(formRef.current.values.name);
    };

    const getFormValues = (values) => {
        return values;
    };

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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        innerRef={formRef}
                    // onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched }) => (
                            <Form id='mainform'
                                // target="_blank"
                                onSubmit={handleSubmit}
                                action="https://formsubmit.co/e5dcdfe6629c8f6fabb6c8d18fcf023f"
                                method="POST"
                            >
                                <input type="hidden" name="_next" value="http://localhost:2000/thankyoubooked" />
                                <input type="hidden" name="AppointmentDate" value={selectedDate.format('MMMM D, YYYY')} />
                                <input type="hidden" name="AppointmentTime" value={selectedTime} />
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
                                

                                {/* <Button
                                    variant='contained'
                                    onClick={() => console.log(getFormValues(values))}
                                    sx={{
                                        mt: 2,
                                        backgroundColor: shades.neutral[700],
                                        '&:hover': {
                                            backgroundColor: shades.secondary[600]
                                        }
                                    }}
                                >
                                    Log Form Values
                                </Button> */}

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
            </Box>

            {selectedTime && (
                <Box sx={{ gridColumn: 'span 2' }} >
                    <form
                    // target="_blank"
                    //   onSubmit={handleSubmit}
                    // action="https://formsubmit.co/e5dcdfe6629c8f6fabb6c8d18fcf023f"
                    // method="POST"
                    >
                        {/* <input type="hidden" name="formdate" value={selectedDate.format('MMMM D, YYYY')} />
                        <input type="hidden" name="formtime" value={selectedTime} />
                        <input type="hidden" name="_next" value="http://localhost:2000/thankyoubooked" />
                        <input type="hidden" name="formname" value={formRef.current.values.name} />
                        <input type="hidden" name="formemail" value={formRef.current.values.email} />
                        <input type="hidden" name="formphone" value={formRef.current.values.phone} />
                        <input type="hidden" name="formparty" value={formRef.current.values.partySize} />
                         */}
                        <Button
                            mt='20px'
                            fullWidth
                            variant="contained"
                            type="submit"
                            form='mainform'
                            // onClick={handleSubmit}
                            sx={{ backgroundColor: shades.secondary[600], '&:hover': { backgroundColor: shades.secondary[700] } }}
                        >
                            Book Appointment
                        </Button>
                    </form>
                </Box>
            )}

            {/* {isBooked && (
  <Typography variant="subtitle1" color="white">
    Your appointment on {selectedDate.format('MMMM D, YYYY')} at {selectedTime} has been booked.
  </Typography>
)} */}

        </Box>
    );
};

export default BookingForm;
