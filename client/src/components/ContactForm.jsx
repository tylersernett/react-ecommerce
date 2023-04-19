import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { shades } from '../theme';

const ContactForm = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, subject, message });
    // Replace with your own code to send the form data to a server or API
  };

  return (
    <Box >
        <Typography variant='h3'>
            Contact Form
        </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="subject"
          label="Subject"
          fullWidth
          margin="normal"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          id="message"
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="contained" 
        sx={{ mt: 2,
            backgroundColor: shades.neutral[700],
            "&:hover": {
                backgroundColor: shades.secondary[600],
              } }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;