import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Container,
  Grid 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  paper: {
    padding: '3rem',
    textAlign: 'center',
    maxWidth: '800px',
    width: '100%',
  },
  roleButton: {
    margin: '1rem',
    padding: '2rem',
    minWidth: '250px',
    minHeight: '120px',
    fontSize: '1.2rem',
    textTransform: 'none',
    textDecoration: 'none',
  },
  icon: {
    fontSize: '4rem !important',
    marginBottom: '1rem',
  },
  hero: {
    marginBottom: '3rem',
  },
  subtitle: {
    marginBottom: '2rem',
    color: '#666',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Box className={classes.hero}>
          <VideoCallIcon className={classes.icon} color="primary" />
          <Typography variant="h3" gutterBottom>
            Counseling Platform
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Professional video counseling sessions with secure, private connections
          </Typography>
        </Box>
        
        <Typography variant="h5" gutterBottom>
          Choose Your Access Type
        </Typography>
        
        <Grid container spacing={3} justifyContent="center" style={{ marginTop: '2rem' }}>
          <Grid item>
            <Button
              component={Link}
              to="/admin"
              variant="contained"
              color="primary"
              className={classes.roleButton}
              elevation={2}
            >
              <Box>
                <AdminPanelSettingsIcon className={classes.icon} />
                <br />
                <Typography variant="h6">Admin Portal</Typography>
                <Typography variant="body2">
                  For counselors and administrators
                </Typography>
              </Box>
            </Button>
          </Grid>
          
          <Grid item>
            <Button
              component={Link}
              to="/client"
              variant="contained"
              color="secondary"
              className={classes.roleButton}
              elevation={2}
            >
              <Box>
                <PersonIcon className={classes.icon} />
                <br />
                <Typography variant="h6">Client Access</Typography>
                <Typography variant="body2">
                  For clients seeking counseling
                </Typography>
              </Box>
            </Button>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            Secure • Private • Professional
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
