import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PsychologyIcon from '@mui/icons-material/Psychology';

const HeroContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    minHeight: '90vh',
    padding: theme.spacing(1),
  },
}));

const HeroPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '900px',
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

const RoleCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5),
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    borderRadius: '15px',
  },
}));

const HeroIcon = styled(VideoCallIcon)(({ theme }) => ({
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
    fontSize: '3rem',
  },
}));

const RoleIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: 'rgba(102, 126, 234, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(102, 126, 234, 0.2)',
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.2)',
  },
}));

const HomePage = () => {
  return (
    <HeroContainer maxWidth={false} className="fade-in-up">
      <HeroPaper elevation={0}>
        {/* Hero Section */}
        <Box mb={4}>
          <HeroIcon className="float" />
          <Typography variant="h2" gutterBottom sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2
          }}>
            Counseling Platform
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: '600px', mx: 'auto' }}>
            Professional video counseling sessions with secure, private connections. 
            Connect with licensed counselors from the comfort of your own space.
          </Typography>
          
          {/* Feature Tags */}
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 4 }}>
            <FeatureChip icon={<SecurityIcon />} label="Secure & Private" size="small" />
            <FeatureChip icon={<PhoneEnabledIcon />} label="HD Video Calls" size="small" />
            <FeatureChip icon={<PsychologyIcon />} label="Licensed Professionals" size="small" />
          </Stack>
        </Box>
        
        <Typography variant="h5" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Choose Your Access Type
        </Typography>
        
        {/* Role Selection Cards */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={5}>
            <RoleCard 
              component={Link} 
              to="/admin" 
              sx={{ textDecoration: 'none' }}
              elevation={0}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
                <RoleIcon>
                  <AdminPanelSettingsIcon sx={{ fontSize: 'inherit', color: 'primary.main' }} />
                </RoleIcon>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Counselor Portal
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                  Access your dashboard, manage client sessions, and view waiting queue
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ 
                    mt: 'auto',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  Enter Portal
                </Button>
              </CardContent>
            </RoleCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={5}>
            <RoleCard 
              component={Link} 
              to="/client" 
              sx={{ textDecoration: 'none' }}
              elevation={0}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0 }}>
                <RoleIcon>
                  <PersonIcon sx={{ fontSize: 'inherit', color: 'secondary.main' }} />
                </RoleIcon>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Client Access
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
                  Join the counseling queue and connect with a professional counselor
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{ 
                    mt: 'auto',
                    width: '100%',
                    maxWidth: '200px'
                  }}
                >
                  Join Session
                </Button>
              </CardContent>
            </RoleCard>
          </Grid>
        </Grid>

        {/* Trust Indicators */}
        <Box mt={5} pt={3} sx={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            🔒 End-to-end encrypted • 🏥 HIPAA compliant • 🌍 Available 24/7
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Trusted by thousands of users worldwide
          </Typography>
        </Box>
      </HeroPaper>
    </HeroContainer>
  );
};

export default HomePage;
