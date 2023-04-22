
import React, { useState } from 'react';
import { Button, ButtonGroup, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { shades } from '../../theme';
import dayjs from 'dayjs';
import BookingForm from './BookingForm';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day')); //defaults to tomorrow
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleDateChange = (date) => {
    console.log(dayjs(date))
    setSelectedDate(dayjs(date));
    setSelectedTime(null);
    setIsBooked(false);
  };

  const handleTimeChange = (event) => {
    console.log(event.target.value)
    setSelectedTime(event.target.value);
    setIsBooked(false);
  };

  const handleBookAppointment = () => {
    console.log("book")
    // Check if the selected time slot is available for booking
    // const isAvailable = !timeSlots.some((slot) => {
    //   return (
    //     console.log('b2')
    //     // slot.start === selectedTime.toLocaleTimeString().slice(0, 5) ||
    //     // (slot.start < selectedTime.toLocaleTimeString().slice(0, 5) &&
    //     //   slot.end > selectedTime.toLocaleTimeString().slice(0, 5))
    //   );
    // });

    // if (isAvailable) {
    //   setIsBooked(true);
    // } else {
    //   alert('This time slot is already booked. Please select a different time slot.');
    // }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display='flex'
        flexWrap='wrap'
        // gridTemplateColumns={'2fr 1fr 1fr'} 
        gap='35px'
      >
        <Box>
          <DateCalendar
            disablePast
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            showDaysOutsideCurrentMonth
            views={['day']}
            sx={{ margin: '0', }}
          />
        </Box>

        <Box display='grid' gridTemplateColumns={'1fr 1fr'} columnGap='60px'>
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


            {selectedTime && (
              <Button mt='20px' width='200px' variant="contained" onClick={handleBookAppointment} sx={{ backgroundColor: shades.secondary[600], '&:hover': { backgroundColor: shades.secondary[700] } }}>
                Book Appointment
              </Button>
            )}

            {/* Name, Party Size, Email, Phone # */}

            {isBooked && (
              <Typography variant="subtitle1" color="white">
                Your appointment on {selectedDate.format('MMMM D, YYYY')} at {selectedTime} has been booked.
              </Typography>
            )}
          </Box>

          <Box maxWidth='156px' mt='15px'>
            <BookingForm />
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentBooking;