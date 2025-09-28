import React, { useContext } from 'react';
import { 
  Typography, 
  Box, 
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { SocketContext } from '../../SocketContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.7);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(233, 30, 99, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(233, 30, 99, 0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const QueueContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: 'calc(100vh - 80px)',
    padding: theme.spacing(1),
  },
}));

const QueueCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  maxWidth: '600px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(25px)',
  borderRadius: '40px',
  boxShadow: '0 25px 70px rgba(233, 30, 99, 0.15)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${float} 6s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(233, 30, 99, 0.1), transparent)`,
    animation: `${shimmer} 3s infinite`,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    borderRadius: '35px',
    maxWidth: '500px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: '30px',
    margin: theme.spacing(1),
  },
}));

const WelcomeIcon = styled(PersonIcon)(({ theme }) => ({
  fontSize: '6rem',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  filter: 'drop-shadow(0 4px 8px rgba(233, 30, 99, 0.3))',
  animation: `${pulse} 3s infinite`,
  [theme.breakpoints.down('md')]: {
    fontSize: '5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: theme.spacing(1),
  textShadow: '0 2px 4px rgba(233, 30, 99, 0.2)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const WaitingAnimation = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#e91e63',
  filter: 'drop-shadow(0 0 8px rgba(233, 30, 99, 0.5))',
  animation: `${spin} 2s linear infinite`,
}));

const FloatingIcon = styled(PsychologyIcon)(({ theme }) => ({
  position: 'absolute',
  fontSize: '2rem',
  color: '#e91e63',
  opacity: 0.3,
  animation: `${float} 4s ease-in-out infinite`,
  '&:nth-of-type(1)': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    top: '70%',
    right: '10%',
    animationDelay: '1.5s',
  },
  '&:nth-of-type(3)': {
    top: '40%',
    left: '85%',
    animationDelay: '3s',
  },
}));

const PositionBadge = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 900,
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  margin: theme.spacing(2, 0),
  textShadow: '0 4px 8px rgba(233, 30, 99, 0.3)',
  animation: `${pulse} 2.5s infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

const ModernChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
  color: 'white',
  fontSize: '1rem',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  height: '50px',
  borderRadius: '25px',
  boxShadow: '0 8px 20px rgba(233, 30, 99, 0.4)',
  border: 'none',
  '& .MuiChip-icon': {
    color: 'white',
    fontSize: '1.2rem',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #ad1457 0%, #880e4f 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(233, 30, 99, 0.5)',
  },
  transition: 'all 0.3s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    height: '45px',
    padding: theme.spacing(0.8, 1.5),
  },
}));

const InfoCard = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  background: 'rgba(233, 30, 99, 0.08)',
  backdropFilter: 'blur(10px)',
  borderRadius: '25px',
  border: '1px solid rgba(233, 30, 99, 0.2)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
    borderRadius: '25px 25px 0 0',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  background: 'linear-gradient(135deg, transparent, rgba(233, 30, 99, 0.3), transparent)',
  height: '2px',
  border: 'none',
}));

const ClientQueue = () => {
  const { queuePosition, Name } = useContext(SocketContext);

  return (
    <QueueContainer className="fade-in-up">
      <QueueCard>
        <PsychologyIcon sx={{ 
          position: 'absolute', 
          top: '20%', 
          left: '10%', 
          fontSize: '2rem',
          color: 'rgba(233, 30, 99, 0.2)',
          animation: `${float} 4s ease-in-out infinite`,
        }} />
        <PsychologyIcon sx={{ 
          position: 'absolute', 
          top: '70%', 
          right: '10%', 
          fontSize: '1.8rem',
          color: 'rgba(233, 30, 99, 0.2)',
          animation: `${float} 4s ease-in-out infinite 1.5s`,
        }} />
        <PsychologyIcon sx={{ 
          position: 'absolute', 
          top: '40%', 
          left: '85%', 
          fontSize: '2.2rem',
          color: 'rgba(233, 30, 99, 0.2)',
          animation: `${float} 4s ease-in-out infinite 3s`,
        }} />

        <WelcomeIcon />
        
        <WelcomeTitle variant="h3">
          Welcome, {Name}!
        </WelcomeTitle>
        
        <Typography 
          variant="h6" 
          sx={{
            color: 'rgba(0, 0, 0, 0.7)',
            fontWeight: 500,
            mb: 2,
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}
        >
          You're in the counseling queue
        </Typography>

        <StyledDivider />

        <WaitingAnimation>
          <CustomCircularProgress size={80} thickness={4} />
          <Typography 
            variant="body1" 
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontWeight: 500,
              animation: `${pulse} 3s infinite`,
            }}
          >
            Connecting you with a professional counselor...
          </Typography>
        </WaitingAnimation>

        <PositionBadge>
          <Typography variant="inherit" component="span">
            Position: 
          </Typography>
          <Typography 
            variant="inherit" 
            component="span"
            sx={{
              ml: 1,
              fontSize: '1.2em',
              textShadow: '0 0 10px rgba(233, 30, 99, 0.5)',
            }}
          >
            {queuePosition || 'Connecting...'}
          </Typography>
        </PositionBadge>

        <Box sx={{ my: 4 }}>
          <ModernChip
            icon={<AccessTimeIcon />}
            label="Waiting for counselor"
            size="large"
          />
        </Box>

        <InfoCard>
          <Typography 
            variant="body1" 
            sx={{
              color: 'rgba(0, 0, 0, 0.8)',
              fontWeight: 500,
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', md: '1rem' }
            }}
          >
            Please stay on this page while our professional counselor reviews the queue. 
            You will be automatically connected when it's your turn for a confidential session.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{
                color: 'rgba(233, 30, 99, 0.8)',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              🔒 Your privacy and confidentiality are our priority
            </Typography>
          </Box>
        </InfoCard>
      </QueueCard>
    </QueueContainer>
  );
};

export default ClientQueue;
