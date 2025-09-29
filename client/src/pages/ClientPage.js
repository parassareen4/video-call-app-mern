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
  Alert,
  IconButton,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ClientQueue from '../components/ClientQueue/ClientQueue';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Options from '../components/Options/Options';
import Notification from '../components/Notification/Notification';
import { SocketContext } from '../SocketContext';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '500px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    borderRadius: '25px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '20px',
    margin: theme.spacing(1),
  },
}));

const LoginIcon = styled(PersonIcon)(({ theme }) => ({
  fontSize: '5rem',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  [theme.breakpoints.down('md')]: {
    fontSize: '4rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3.5rem',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: 0,
  [theme.breakpoints.down('md')]: {
    position: 'sticky',
  },
}));

const BackFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1300,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)',
  },
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const ClientPage = () => {
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
    // Add delay to ensure call cleanup completes
    setTimeout(() => {
      setIsJoined(false);
      setClientName('');
      navigate('/');
    }, 500);
  };

  const renderJoinForm = () => (
    <>
      <BackFab size="medium" onClick={() => navigate('/')} aria-label="back">
        <ArrowBackIcon />
      </BackFab>
      <LoginContainer maxWidth={false} className="fade-in-up">
        <LoginPaper elevation={0}>
          <LoginIcon />
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2
          }}>
            Join Counseling
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
            Enter your name to join the counseling queue and connect with a professional counselor
          </Typography>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '15px',
                background: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.2)'
              }}
            >
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleJoinQueue(); }}>
            <TextField 
              label="Your Name" 
              value={clientName} 
              onChange={(e) => setClientName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinQueue()}
              fullWidth 
              margin="normal"
              autoFocus
              helperText="This name will be visible to your counselor"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleJoinQueue}
              disabled={!clientName.trim()}
              size="large"
              sx={{ 
                py: 1.5,
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Join Queue
            </Button>
          </Box>

          <Button
            color="primary"
            onClick={() => navigate('/')}
            sx={{ 
              mt: 2,
              textTransform: 'none'
            }}
          >
            ← Back to Home
          </Button>
        </LoginPaper>
      </LoginContainer>
    </>
  );

  const renderInCall = () => (
    <Box>
      <StyledAppBar position="static">
        <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🔴 Live Session - {clientName}
          </Typography>
          <Button 
            color="inherit" 
            onClick={leaveCall} 
            startIcon={<ExitToAppIcon />}
            sx={{ 
              mr: 1,
              borderRadius: '20px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            End Session
          </Button>
          <IconButton 
            color="inherit" 
            onClick={handleLeave}
            sx={{ 
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)' }}>
        <VideoPlayer />
        <Options role="client" />
      </Box>
    </Box>
  );

  const renderQueue = () => (
    <Box>
      <StyledAppBar position="static">
        <Toolbar sx={{ minHeight: { xs: '56px', sm: '64px' } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              mr: 2,
              display: { xs: 'none', md: 'inline-flex' },
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Counseling Queue - Welcome, {clientName}
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              Queue
            </Box>
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mr: 2,
              display: { xs: 'none', sm: 'inline' },
              background: 'rgba(255, 255, 255, 0.2)',
              px: 2,
              py: 0.5,
              borderRadius: '20px'
            }}
          >
            Position: {queuePosition || '-'}
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLeave} 
            startIcon={<ExitToAppIcon />}
            sx={{ 
              borderRadius: '20px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Leave Queue
            </Box>
          </Button>
        </Toolbar>
      </StyledAppBar>
      <BackFab size="medium" onClick={() => navigate('/')} aria-label="home">
        <HomeIcon />
      </BackFab>
      <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)' }}>
        <ClientQueue />
        <Notification />
      </Box>
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
