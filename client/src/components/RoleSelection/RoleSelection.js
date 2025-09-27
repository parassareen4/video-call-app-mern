import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  roleButton: {
    margin: '1rem',
    padding: '1.5rem',
    minWidth: '200px',
    fontSize: '1.1rem',
  },
  icon: {
    fontSize: '3rem !important',
    marginBottom: '1rem',
  },
}));

const RoleSelection = ({ onRoleSelect }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Welcome to Counseling Platform
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Please select your role to continue
        </Typography>
        
        <Box mt={4}>
          <Box>
            <AdminPanelSettingsIcon className={classes.icon} color="primary" />
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.roleButton}
              onClick={() => onRoleSelect('admin')}
            >
              Admin / Counselor
            </Button>
          </Box>
          
          <Box mt={3}>
            <PersonIcon className={classes.icon} color="secondary" />
            <br />
            <Button
              variant="contained"
              color="secondary"
              className={classes.roleButton}
              onClick={() => onRoleSelect('client')}
            >
              Client
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RoleSelection;
