
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import BookingForm from './BookingForm';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day')); //defaults to tomorrow
  const [selectedTime, setSelectedTime] = useState(null);
  // const [isBooked, setIsBooked] = useState(false);

  const handleDateChange = (date) => {
    console.log(dayjs(date))
    setSelectedDate(dayjs(date));
    setSelectedTime(null);
    // setIsBooked(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display='flex'
        flexWrap='wrap'
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