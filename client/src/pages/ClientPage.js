import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Box,
  Container,
  Paper,
  TextField,
  Alert
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ClientQueue from '../components/ClientQueue/ClientQueue';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Options from '../components/Options/Options';
import Notification from '../components/Notification/Notification';
import { SocketContext } from '../SocketContext';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const useStyles = makeStyles(() => ({
  loginContainer: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  loginPaper: {
    padding: '3rem',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  icon: {
    fontSize: '4rem !important',
    marginBottom: '1rem',
    color: '#e91e63',
  },
  backButton: {
    marginRight: 'auto',
  },
}));

const ClientPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState('');
  
  const {
    call,
    callAccepted,
    callEnded,
    joinRoom,
    leaveCall,
    queuePosition
  } = useContext(SocketContext);

  const handleJoinQueue = () => {
    if (!clientName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (clientName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    setError('');
    joinRoom('client', clientName);
    setIsJoined(true);
  };

  const handleLeave = () => {
    if (callAccepted && !callEnded) {
      leaveCall();
    }
    setIsJoined(false);
    setClientName('');
    navigate('/');
  };

  const renderJoinForm = () => (
    <Container className={classes.loginContainer}>
      <Paper className={classes.loginPaper} elevation={3}>
        <PersonIcon className={classes.icon} />
        <Typography variant="h4" gutterBottom>
          Join Counseling
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your name to join the counseling queue
        </Typography>
        
        {error && (
          <Alert severity="error" style={{ margin: '1rem 0' }}>
            {error}
          </Alert>
        )}
        
        <Box mt={3}>
          <TextField 
            label="Your Name" 
            value={clientName} 
            onChange={(e) => setClientName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJoinQueue()}
            fullWidth 
            margin="normal"
            autoFocus
            helperText="This name will be visible to your counselor"
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleJoinQueue}
            disabled={!clientName.trim()}
            style={{ marginTop: '2rem', padding: '1rem' }}
          >
            Join Queue
          </Button>
        </Box>

        <Box mt={3}>
          <Button
            color="primary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );

  const renderInCall = () => (
    <Box>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Counseling Session - {clientName}
          </Typography>
          <Button color="inherit" onClick={leaveCall} startIcon={<ExitToAppIcon />}>
            End Session
          </Button>
          <Button color="inherit" onClick={handleLeave}>
            Leave Platform
          </Button>
        </Toolbar>
      </AppBar>
      <VideoPlayer />
      <Options role="client" />
    </Box>
  );

  const renderQueue = () => (
    <Box>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Button 
            className={classes.backButton} 
            color="inherit" 
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Counseling Platform - {clientName}
          </Typography>
          <Typography variant="body2" style={{ marginRight: '1rem' }}>
            Position: {queuePosition || '-'}
          </Typography>
          <Button color="inherit" onClick={handleLeave} startIcon={<ExitToAppIcon />}>
            Leave Queue
          </Button>
        </Toolbar>
      </AppBar>
      <ClientQueue />
      <Notification />
    </Box>
  );

  if (!isJoined) {
    return renderJoinForm();
  }

  // Handle call notifications
  if (call.isReceivedCall && !callAccepted && !callEnded) {
    return renderQueue(); // Notification component handles incoming calls
  }

  // Handle active call
  if (callAccepted && !callEnded) {
    return renderInCall();
  }

  // Default queue view
  return renderQueue();
};

export default ClientPage;
