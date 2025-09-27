import React, { useState, useContext, useEffect } from 'react';
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
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Options from '../components/Options/Options';
import Notification from '../components/Notification/Notification';
import { SocketContext } from '../SocketContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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
    color: '#1976d2',
  },
  backButton: {
    marginRight: 'auto',
  },
}));

const AdminPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  
  const {
    call,
    callAccepted,
    callEnded,
    joinRoom,
    leaveCall
  } = useContext(SocketContext);

  const handleLogin = () => {
    if (!adminName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (adminName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    setError('');
    joinRoom('admin', adminName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (callAccepted && !callEnded) {
      leaveCall();
    }
    setIsLoggedIn(false);
    setAdminName('');
    navigate('/');
  };

  const renderLoginForm = () => (
    <Container className={classes.loginContainer}>
      <Paper className={classes.loginPaper} elevation={3}>
        <AdminPanelSettingsIcon className={classes.icon} />
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your credentials to access the counselor dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" style={{ margin: '1rem 0' }}>
            {error}
          </Alert>
        )}
        
        <Box mt={3}>
          <TextField 
            label="Counselor Name" 
            value={adminName} 
            onChange={(e) => setAdminName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            fullWidth 
            margin="normal"
            autoFocus
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={!adminName.trim()}
            style={{ marginTop: '2rem', padding: '1rem' }}
          >
            Access Dashboard
          </Button>
        </Box>

        <Box mt={3}>
          <Button
            color="secondary"
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
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Counseling Session - {adminName}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            End & Logout
          </Button>
        </Toolbar>
      </AppBar>
      <VideoPlayer />
      <Options role="admin" />
    </Box>
  );

  const renderDashboard = () => (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button 
            className={classes.backButton} 
            color="inherit" 
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard - Welcome, {adminName}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <AdminDashboard />
      <Notification />
    </Box>
  );

  if (!isLoggedIn) {
    return renderLoginForm();
  }

  // Handle call notifications
  if (call.isReceivedCall && !callAccepted && !callEnded) {
    return renderDashboard(); // Notification component handles incoming calls
  }

  // Handle active call
  if (callAccepted && !callEnded) {
    return renderInCall();
  }

  // Default dashboard view
  return renderDashboard();
};

export default AdminPage;
