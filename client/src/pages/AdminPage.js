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
  IconButton,
  Fab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import Options from '../components/Options/Options';
import Notification from '../components/Notification/Notification';
import { SocketContext } from '../SocketContext';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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

const LoginIcon = styled(AdminPanelSettingsIcon)(({ theme }) => ({
  fontSize: '5rem',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Ryan');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const {
    call,
    callAccepted,
    callEnded,
    joinRoom,
    leaveCall
  } = useContext(SocketContext);

  // Auto-login as Ryan
  React.useEffect(() => {
    if (!isLoggedIn) {
      joinRoom('admin', 'Ryan');
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, joinRoom]);

  const handleLogin = () => {
    joinRoom('admin', 'Ryan');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (callAccepted && !callEnded) {
      leaveCall();
    }
    setIsLoggedIn(false);
    setAdminName('Ryan');
    navigate('/');
  };

  const renderLoginForm = () => (
    <>
      <BackFab size="medium" onClick={() => navigate('/')} aria-label="back">
        <ArrowBackIcon />
      </BackFab>
      <LoginContainer maxWidth={false} className="fade-in-up">
        <LoginPaper elevation={0}>
          <LoginIcon />
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2
          }}>
            Counselor Portal
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
            Enter your credentials to access the counselor dashboard
          </Typography>
          
          <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <TextField 
              label="Counselor Name" 
              value={adminName} 
              onChange={(e) => setAdminName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              fullWidth 
              margin="normal"
              autoFocus
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
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={!adminName.trim()}
              size="large"
              sx={{ 
                py: 1.5,
                mb: 2,
                fontSize: '1.1rem'
              }}
            >
              Access Dashboard
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
            🔴 Live Session - {adminName}
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
            onClick={handleLogout}
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
      <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <VideoPlayer />
        <Options role="admin" />
      </Box>
    </Box>
  );

  const renderDashboard = () => (
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
              Counselor Dashboard - Welcome, {adminName}
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              Dashboard
            </Box>
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            startIcon={<ExitToAppIcon />}
            sx={{ 
              borderRadius: '20px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Logout
            </Box>
          </Button>
        </Toolbar>
      </StyledAppBar>
      <BackFab size="medium" onClick={() => navigate('/')} aria-label="home">
        <HomeIcon />
      </BackFab>
      <Box sx={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <AdminDashboard />
        <Notification />
      </Box>
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
