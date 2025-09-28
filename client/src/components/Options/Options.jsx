import { Button, Container, TextField, Grid, Typography, Paper, Box, Chip, Alert } from '@mui/material';
import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, AccountCircle, CallEnd, PersonAdd } from '@mui/icons-material';
import { SocketContext } from '../../SocketContext';

const OptionsContainer = styled(Container)(({ theme }) => ({
  padding: `${theme.spacing(2)} !important`,
  maxWidth: '1000px !important',
  margin: '0 auto !important',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(1)} !important`,
  },
}));

const OptionsPaper = styled(Paper)(({ theme }) => ({
  padding: `${theme.spacing(3)} !important`,
  borderRadius: '25px !important',
  background: 'rgba(255, 255, 255, 0.95) !important',
  backdropFilter: 'blur(20px) !important',
  border: '1px solid rgba(255, 255, 255, 0.2) !important',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1) !important',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(2)} !important`,
    borderRadius: '20px !important',
    margin: `${theme.spacing(1)} !important`,
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '15px !important',
    padding: `${theme.spacing(1.5)} !important`,
  },
}));

const SectionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '20px',
  background: 'rgba(102, 126, 234, 0.05)',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    borderRadius: '15px',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: `${theme.spacing(2)} !important`,
  '& .MuiOutlinedInput-root': {
    borderRadius: '15px !important',
    background: 'rgba(255, 255, 255, 0.8) !important',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9) !important',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 1) !important',
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px !important',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)} !important`,
  fontWeight: '600 !important',
  textTransform: 'none !important',
  fontSize: '1rem !important',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1) !important',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
  '&:hover': {
    transform: 'translateY(-2px) !important',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15) !important',
  },
  '&:disabled': {
    transform: 'none !important',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05) !important',
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)} !important`,
    fontSize: '0.9rem !important',
  },
}));

const IdChip = styled(Chip)(({ theme }) => ({
  marginTop: theme.spacing(1),
  background: 'rgba(102, 126, 234, 0.1) !important',
  color: theme.palette.primary.main,
  border: '1px solid rgba(102, 126, 234, 0.2)',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  maxWidth: '100%',
  '& .MuiChip-label': {
    padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  },
}));

const Options = ({ children, role }) => {
  const { me, callAccepted, Name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <OptionsContainer>
      <OptionsPaper elevation={0}>
        <Grid container spacing={3}>
          {/* Account Info Section */}
          <Grid item xs={12} md={6}>
            <SectionBox>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AccountCircle color="primary" />
                Account Info
              </Typography>
              
              <StyledTextField 
                label='Your Name' 
                value={Name} 
                onChange={(e) => setName(e.target.value)} 
                fullWidth 
                size="medium"
              />
              
              <CopyToClipboard text={me} onCopy={handleCopy}>
                <ActionButton
                  variant='contained' 
                  color='primary' 
                  fullWidth 
                  startIcon={<Assignment />}
                  sx={{ mb: 1 }}
                >
                  {copied ? 'ID Copied!' : 'Copy Your ID'}
                </ActionButton>
              </CopyToClipboard>
              
              {me && (
                <IdChip 
                  label={`ID: ${me.substring(0, 8)}...`} 
                  size="small" 
                />
              )}
            </SectionBox>
          </Grid>

          {/* Call Controls Section */}
          <Grid item xs={12} md={6}>
            <SectionBox>
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Phone color="primary" />
                Call Controls
              </Typography>
              
              {role !== 'client' && (
                <StyledTextField 
                  label='Contact ID to Call' 
                  value={idToCall} 
                  onChange={(e) => setIdToCall(e.target.value)} 
                  fullWidth 
                  placeholder="Enter the ID of person to call"
                  size="medium"
                />
              )}
              
              <Box>
                {callAccepted && !callEnded ? (
                  <ActionButton
                    variant='contained'
                    color='error'
                    fullWidth
                    startIcon={<CallEnd />}
                    onClick={leaveCall}
                    size="large"
                  >
                    End Session
                  </ActionButton>
                ) : role !== 'client' ? (
                  <ActionButton
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    startIcon={<PersonAdd />}
                    disabled={!idToCall}
                    size="large"
                  >
                    Start Call
                  </ActionButton>
                ) : (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      borderRadius: '15px',
                      background: 'rgba(33, 150, 243, 0.1)',
                      border: '1px solid rgba(33, 150, 243, 0.2)',
                      '& .MuiAlert-icon': {
                        color: '#2196f3'
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      📞 Waiting for counselor to initiate session
                    </Typography>
                  </Alert>
                )}
              </Box>
            </SectionBox>
          </Grid>
        </Grid>
        {children}
      </OptionsPaper>
    </OptionsContainer>
  );
};

export default Options;