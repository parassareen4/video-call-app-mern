import React, { useContext } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Chip
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../../SocketContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  paper: {
    padding: '3rem',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  waitingAnimation: {
    margin: '2rem 0',
  },
  icon: {
    fontSize: '4rem !important',
    color: '#1976d2',
    marginBottom: '1rem',
  },
  position: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1976d2',
    margin: '1rem 0',
  },
  info: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
}));

const ClientQueue = () => {
  const classes = useStyles();
  const { queuePosition, Name } = useContext(SocketContext);

  return (
    <Box className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <PersonIcon className={classes.icon} />
        
        <Typography variant="h4" gutterBottom>
          Welcome, {Name}!
        </Typography>
        
        <Typography variant="h6" color="textSecondary" gutterBottom>
          You're in the counseling queue
        </Typography>

        <Box className={classes.waitingAnimation}>
          <CircularProgress size={60} />
        </Box>

        <Box className={classes.position}>
          Position: {queuePosition || 'Connecting...'}
        </Box>

        <Chip
          icon={<AccessTimeIcon />}
          label="Waiting for counselor"
          color="primary"
          variant="outlined"
          size="large"
        />

        <Box className={classes.info}>
          <Typography variant="body2" color="textSecondary">
            Please wait while our counselor reviews the queue. 
            You will be notified when it's your turn for a session.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ClientQueue;
