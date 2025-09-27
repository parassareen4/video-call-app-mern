import { Button, Container, TextField, Grid, Typography, Paper, Box } from '@mui/material'
import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled, PersonAdd } from '@mui/icons-material';
import { SocketContext } from '../../SocketContext';
import './Options.css';

const Options = ({ children, onNameSubmit, role }) => {

  const { me, callAccepted, Name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [tempName, setTempName] = useState('');

  // If onNameSubmit is provided, show name entry form
  if (onNameSubmit) {
    return (
      <Container className='container'>
        <Paper elevation={10} className='paper'>
          <Box textAlign="center" py={4}>
            <Typography variant="h5" gutterBottom>
              {role === 'admin' ? 'Welcome, Counselor' : 'Welcome, Client'}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Please enter your name to continue
            </Typography>
            <Box mt={3} maxWidth={400} mx="auto">
              <TextField 
                label="Your Name" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
                fullWidth 
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onNameSubmit(tempName)}
                disabled={!tempName.trim()}
                startIcon={<PersonAdd />}
                style={{ marginTop: '1rem' }}
              >
                {role === 'admin' ? 'Enter Dashboard' : 'Join Queue'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Regular options for video call interface
  return (
    <Container className='container'>
      <Paper elevation={10} className='paper'>
        <form className='root' noValidate autoComplete='off'>
          <Grid container className='gridContainer'>
            <Grid item xs={12} md={6} className='padding' >
              <Typography gutterBottom variant='h6' > Account Info </Typography>
              <TextField label='Name' value={Name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className='margin' >
                <Button variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} className='padding' >
              <Typography gutterBottom variant='h6' > Call Controls </Typography>
              {role !== 'client' && (
                <TextField label='ID For Call' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              )}
              <Grid className='margin'>
                {callAccepted && !callEnded ?
                  (
                    <Button
                      variant='contained'
                      color='secondary'
                      fullWidth
                      startIcon={<PhoneDisabled fontSize='large' />}
                      onClick={leaveCall}
                    >
                      End Session
                    </Button>
                  ) :
                  role !== 'client' ? (
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      onClick={() => callUser(idToCall)}
                      startIcon={<Phone fontSize='large' />}
                      disabled={!idToCall}
                    >
                      Call
                    </Button>
                  ) : (
                    <Typography variant="body2" color="textSecondary" textAlign="center">
                      Waiting for counselor to initiate session
                    </Typography>
                  )}
              </Grid>

            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options