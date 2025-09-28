import React, { useContext } from 'react';
import { Button, Box, Typography, Avatar, Paper, Fade, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../../SocketContext';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PersonIcon from '@mui/icons-material/Person';
import { keyframes } from '@mui/system';

const pulseRing = keyframes`
  0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: scale(1.33);
  }
`;

const NotificationContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2000,
  width: '90%',
  maxWidth: '400px',
  [theme.breakpoints.up('md')]: {
    width: '400px',
  },
}));

const NotificationPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '30px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(25px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '25px',
  },
}));

const CallerAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto 16px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(102, 126, 234, 0.3)',
    transform: 'translate(-50%, -50%)',
    animation: `${pulseRing} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(102, 126, 234, 0.3)',
    transform: 'translate(-50%, -50%)',
    animation: `${pulseRing} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.3s infinite`,
  },
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  minWidth: '120px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100px',
    padding: theme.spacing(1, 2),
    fontSize: '0.9rem',
  },
}));

const Notification = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  if (!call.isReceivedCall || callAccepted) {
    return null;
  }

  return (
    <Fade in={call.isReceivedCall && !callAccepted} timeout={500}>
      <NotificationContainer>
        <NotificationPaper elevation={0}>
          <CallerAvatar>
            <PersonIcon sx={{ fontSize: 40 }} />
          </CallerAvatar>
          
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 1
          }}>
            Incoming Call
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {call.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            is calling you for a counseling session
          </Typography>

          <Box display="flex" gap={2} justifyContent="center">
            <ActionButton
              variant="contained"
              sx={{ 
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
                }
              }}
              startIcon={<PhoneIcon />}
              onClick={answerCall}
            >
              Answer
            </ActionButton>
            
            <ActionButton
              variant="outlined"
              color="error"
              startIcon={<PhoneDisabledIcon />}
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': {
                  borderColor: '#d32f2f',
                  background: 'rgba(244, 67, 54, 0.04)',
                }
              }}
            >
              Decline
            </ActionButton>
          </Box>
        </NotificationPaper>
      </NotificationContainer>
    </Fade>
  );
};

export default Notification;