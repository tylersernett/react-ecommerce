
import React, { useState } from 'react';
import { Button, ButtonGroup, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const timeSlots = [
  { start: '09:00', end: '10:00' },
  { start: '10:00', end: '11:00' },
  { start: '11:00', end: '12:00' },
  { start: '12:00', end: '13:00' },
  { start: '13:00', end: '14:00' },
  { start: '14:00', end: '15:00' },
  { start: '15:00', end: '16:00' },
  { start: '16:00', end: '17:00' },
];

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
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
    const isAvailable = !timeSlots.some((slot) => {
      return (
        console.log('b2')
        // slot.start === selectedTime.toLocaleTimeString().slice(0, 5) ||
        // (slot.start < selectedTime.toLocaleTimeString().slice(0, 5) &&
        //   slot.end > selectedTime.toLocaleTimeString().slice(0, 5))
      );
    });

    if (isAvailable) {
      setIsBooked(true);
    } else {
      alert('This time slot is already booked. Please select a different time slot.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display='grid' gridTemplateColumns={'1fr 1fr'}>
        <Box>
          <DateCalendar
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            showDaysOutsideCurrentMonth
          />
        </Box>
        <Box width='156px'>
          {selectedDate && (
            <>
              <Typography>
                {selectedDate.format('MMMM D, YYYY')}
              </Typography>
              <Box >
                <ToggleButtonGroup orientation="vertical"
                  aria-label="Time Select"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  defaultValue='12'
                  fullWidth
                  exclusive={true}
                >
                  <ToggleButton  width='100px' value='12pm'>12pm</ToggleButton>
                  <ToggleButton value='1pm'>1pm</ToggleButton>
                  <ToggleButton value='2pm'>2pm</ToggleButton>
                  <ToggleButton value='3pm'>3pm</ToggleButton>
                </ToggleButtonGroup>
              </Box>
              
            </>
          )}
        

        {selectedTime && (
        <Button width='200px' variant="contained" color="primary" onClick={handleBookAppointment}>
          Book Appointment
        </Button>
      )}
      {isBooked && (
        <Typography variant="subtitle1" color="white">
          Your appointment on {selectedDate.format('MMMM D, YYYY')} at {selectedTime} has been booked.
        </Typography>
      )}
      </Box>
      </Box>


      
    </LocalizationProvider>
  );
};

export default AppointmentBooking;
/*
import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  // DatePicker,
} from '@mui/material';
// import {makeStyles} from "@mui/styles";
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// const useStyles = makeStyles((theme) => ({
//   timeSlotButton: {
//     margin: theme.spacing(1),
//     width: "100px",
//   },
// }));

const AppointmentBooking = () => {
  // const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsBooked(false);
    setTimeSlots([
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0),
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0),
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 0),
    ]);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setIsBooked(false);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) return;

    const isAvailable = timeSlots.some((slot) => slot.getTime() === selectedTime.getTime());

    if (isAvailable) {
      setIsBooked(true);
    } else {
      alert("Selected time slot is not available. Please select a different time slot.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        format="dd/MM/yyyy"
      />
      {selectedDate && (
        <Grid container spacing={2}>
          {timeSlots.map((time) => (
            <Grid item key={time.getTime()}>
              <Button
                variant={selectedTime?.getTime() === time.getTime() ? "contained" : "outlined"}
                color="primary"
                // className={classes.timeSlotButton}
                onClick={() => handleTimeChange(time)}
                disabled={time.getTime() < new Date().getTime()}
              >
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedTime && (
        <Button variant="contained" color="primary" onClick={handleBookAppointment}>
          Book Appointment
        </Button>
      )}
      {isBooked && (
        <Typography variant="subtitle1" color="primary">
          Your appointment on {selectedDate.toDateString()} at {selectedTime.toLocaleTimeString()} has been booked.
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default AppointmentBooking;*/