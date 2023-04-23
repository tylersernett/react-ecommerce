
import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { shades } from '../../theme';
import dayjs from 'dayjs';
import BookingForm from './BookingForm';
import useMediaQuery from "@mui/material/useMediaQuery";
import * as Yup from 'yup';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day')); //defaults to tomorrow
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleDateChange = (date) => {
    console.log(dayjs(date))
    setSelectedDate(dayjs(date));
    setSelectedTime(null);
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
        gap='15px'
        justifyContent={'center'}
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


        <BookingForm selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime}/>

      </Box>
    </LocalizationProvider>
  );
};

export default AppointmentBooking;