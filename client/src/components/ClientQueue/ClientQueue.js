import React, { useContext } from 'react';
import { 
  Typography, 
  Box, 
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../../SocketContext';



const QueueContainer = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const QueueCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '400px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));



const ClientQueue = () => {
  const { queuePosition, Name } = useContext(SocketContext);

  return (
    <QueueContainer>
      <QueueCard>
        <Typography 
          variant="h4" 
          sx={{
            fontWeight: 600,
            color: '#2c3e50',
            mb: 1
          }}
        >
          Hi, {Name}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
            mb: 4
          }}
        >
          You're in the queue
        </Typography>

        <Box sx={{ mb: 4 }}>
          <CircularProgress 
            size={60} 
            thickness={4}
            sx={{ color: '#e91e63' }}
          />
        </Box>

        <Typography 
          variant="h2" 
          sx={{
            fontWeight: 700,
            color: '#e91e63',
            mb: 1
          }}
        >
          {queuePosition || '—'}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{
            color: 'rgba(0, 0, 0, 0.5)',
            mb: 4
          }}
        >
          Position in queue
        </Typography>

        <Typography 
          variant="body2" 
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
            lineHeight: 1.5
          }}
        >
          Please wait while we connect you with a counselor. You'll be notified when it's your turn.
        </Typography>
      </QueueCard>
    </QueueContainer>
  );
};

export default ClientQueue;
