import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Button, 
  Container 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
    maxWidth: '600px',
    width: '100%',
  },
  icon: {
    fontSize: '6rem !important',
    color: '#f44336',
    marginBottom: '1rem',
  },
  button: {
    marginTop: '2rem',
    padding: '1rem 2rem',
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <ErrorOutlineIcon className={classes.icon} />
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          The page you're looking for doesn't exist.
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ margin: '2rem 0' }}>
          You might want to check the URL or return to the homepage to access the counseling platform.
        </Typography>
        
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          className={classes.button}
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;
