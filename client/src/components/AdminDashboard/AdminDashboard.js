import React, { useContext, useEffect, useState } from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Button,
  Box,
  Chip,
  Grid,
  CircularProgress,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '../../SocketContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles(() => ({
  container: {
    padding: '1rem',
  },
  paper: {
    padding: '1.5rem',
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  icon: {
    marginRight: '0.5rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  callButton: {
    marginLeft: '1rem',
  },
  statsContainer: {
    marginBottom: '2rem',
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const { waitingClients, adminCallClient, me } = useContext(SocketContext);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Update timestamp when clients change
  useEffect(() => {
    setLastUpdate(Date.now());
  }, [waitingClients]);

  const handleCallClient = (clientId) => {
    adminCallClient(clientId);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <Box className={classes.container}>
      <Grid container spacing={3} className={classes.statsContainer}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Box className={classes.header}>
              <PeopleIcon className={classes.icon} />
              <Typography variant="h6">
                Waiting Clients
              </Typography>
              <Chip 
                label={waitingClients?.length || 0} 
                color="primary" 
                style={{ marginLeft: '1rem' }}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Box className={classes.header}>
              <AccessTimeIcon className={classes.icon} />
              <Typography variant="h6">
                Last Update
              </Typography>
              <Chip 
                label={formatTime(lastUpdate)} 
                color="secondary" 
                style={{ marginLeft: '1rem' }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Client Queue
        </Typography>
        
        {!waitingClients || waitingClients.length === 0 ? (
          <Box className={classes.emptyState}>
            <PeopleIcon style={{ fontSize: '3rem', opacity: 0.3 }} />
            <Typography variant="h6">
              No clients waiting
            </Typography>
            <Typography variant="body2">
              Clients will appear here when they join the queue
            </Typography>
          </Box>
        ) : (
          <List>
            {waitingClients.map((client, index) => (
              <ListItem key={client.id} divider>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" component="span">
                        {client.name}
                      </Typography>
                      <Chip 
                        label={`#${client.position}`} 
                        size="small" 
                        color="primary" 
                        style={{ marginLeft: '1rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        ID: {client.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Waiting in queue
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VideoCallIcon />}
                    onClick={() => handleCallClient(client.id)}
                    className={classes.callButton}
                    size="large"
                  >
                    Start Session
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
