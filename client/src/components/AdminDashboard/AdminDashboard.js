import React, { useContext, useEffect, useState } from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Button,
  Box,
  Chip,
  Grid,
  ListItemAvatar,
  Avatar,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../../SocketContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';

const DashboardContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
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

const MainCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '30px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    borderRadius: '25px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5),
    borderRadius: '20px',
    marginTop: theme.spacing(2),
  },
}));

const StatsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
  },
}));

const StatsIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1.5),
  fontSize: '2rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
    marginRight: theme.spacing(1),
  },
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const EmptyStateIcon = styled(GroupsIcon)(({ theme }) => ({
  fontSize: '6rem',
  opacity: 0.3,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    fontSize: '5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem',
  },
}));

const ClientListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    transform: 'translateX(5px)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
  },
  '&:last-child': {
    marginBottom: 0,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
    borderRadius: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.25),
    borderRadius: '12px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const ClientAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  width: 50,
  height: 50,
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
    marginBottom: theme.spacing(1),
  },
}));

const StartSessionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '25px',
  padding: theme.spacing(1, 3),
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.75, 2.5),
    fontSize: '0.9rem',
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 2),
    fontSize: '0.85rem',
    borderRadius: '15px',
    marginTop: theme.spacing(1),
    width: '100%',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(102, 126, 234, 0.1)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(102, 126, 234, 0.2)',
  fontWeight: 600,
  '&.MuiChip-colorSecondary': {
    background: 'rgba(118, 75, 162, 0.1)',
    color: theme.palette.secondary.main,
    border: '1px solid rgba(118, 75, 162, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const AdminDashboard = () => {
  const { waitingClients, adminCallClient } = useContext(SocketContext);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

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
    <DashboardContainer maxWidth={false} className="fade-in-up">
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <StatsHeader>
              <StatsIcon>
                <PeopleIcon sx={{ fontSize: 'inherit' }} />
              </StatsIcon>
              <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                Waiting Clients
              </Typography>
              <StyledChip 
                label={waitingClients?.length || 0}
                size="medium"
              />
            </StatsHeader>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
          <StatsCard>
            <StatsHeader>
              <StatsIcon>
                <AccessTimeIcon sx={{ fontSize: 'inherit' }} />
              </StatsIcon>
              <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                Last Update
              </Typography>
              <StyledChip 
                label={formatTime(lastUpdate)}
                color="secondary"
                size="medium"
              />
            </StatsHeader>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Main Client Queue Card */}
      <MainCard>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 3,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Client Queue
        </Typography>
        
        {!waitingClients || waitingClients.length === 0 ? (
          <EmptyStateContainer>
            <EmptyStateIcon className="float" />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
              No clients waiting
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Clients will appear here when they join the counseling queue
            </Typography>
          </EmptyStateContainer>
        ) : (
          <List sx={{ padding: 0 }}>
            {waitingClients.map((client, index) => (
              <ClientListItem key={client.id}>
                <ListItemAvatar>
                  <ClientAvatar>
                    <PersonIcon />
                  </ClientAvatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      flexWrap="wrap" 
                      gap={1}
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                        {client.name}
                      </Typography>
                      <StyledChip 
                        label={`Position #${client.position}`} 
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Client ID: {client.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ⏱️ Waiting in counseling queue
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    flex: '1 1 auto',
                    minWidth: 0,
                    pr: { xs: 0, sm: 2 }
                  }}
                />
                <ListItemSecondaryAction sx={{ position: { xs: 'static', sm: 'absolute' } }}>
                  <StartSessionButton
                    startIcon={<VideoCallIcon />}
                    onClick={() => handleCallClient(client.id)}
                    variant="contained"
                  >
                    Start Session
                  </StartSessionButton>
                </ListItemSecondaryAction>
              </ClientListItem>
            ))}
          </List>
        )}
      </MainCard>
    </DashboardContainer>
  );
};

export default AdminDashboard;
