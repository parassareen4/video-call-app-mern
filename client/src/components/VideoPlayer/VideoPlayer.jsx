import React, { useContext, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SocketContext } from '../../SocketContext';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import PersonIcon from '@mui/icons-material/Person';

const VideoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: theme.spacing(3),
  },
}));

const VideoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '25px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.up('md')]: {
    flex: 1,
    maxWidth: '45%',
    padding: theme.spacing(3),
    borderRadius: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '20px',
    padding: theme.spacing(1.5),
  },
}));

const VideoElement = styled('video')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  background: '#1a1a1a',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  minHeight: '200px',
  objectFit: 'cover',
  [theme.breakpoints.up('md')]: {
    minHeight: '300px',
    borderRadius: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
    minHeight: '180px',
  },
}));

const UserHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: '15px',
  background: 'rgba(102, 126, 234, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  width: 40,
  height: 40,
  [theme.breakpoints.down('sm')]: {
    width: 35,
    height: 35,
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(76, 175, 80, 0.1)',
  color: '#4caf50',
  border: '1px solid rgba(76, 175, 80, 0.3)',
  fontSize: '0.75rem',
  height: 24,
}));

const VideoPlayer = () => {
    const { call, callAccepted, callEnded, stream, myVideo, userVideo, Name } = useContext(SocketContext);
    
    // Ensure video streams are properly assigned
    useEffect(() => {
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;
            console.log('VideoPlayer: My video stream assigned', stream);
        }
    }, [stream, myVideo]);

    return (
        <VideoContainer>
            {/* Own Video */}
            {stream && (
                <VideoPaper elevation={0}>
                    <UserHeader>
                        <UserInfo>
                            <UserAvatar>
                                <PersonIcon />
                            </UserAvatar>
                            <Box>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {Name || 'You'}
                                </Typography>
                                <StatusChip 
                                    icon={<VideocamIcon sx={{ fontSize: '16px !important' }} />} 
                                    label="Live" 
                                    size="small" 
                                />
                            </Box>
                        </UserInfo>
                        <StatusChip 
                            icon={<MicIcon sx={{ fontSize: '16px !important' }} />} 
                            label="Audio On" 
                            size="small" 
                        />
                    </UserHeader>
                    <VideoElement 
                        playsInline 
                        muted 
                        ref={myVideo} 
                        autoPlay 
                    />
                </VideoPaper>
            )}

            {/* Other User's Video */}
            {callAccepted && !callEnded && (
                <VideoPaper elevation={0}>
                    <UserHeader>
                        <UserInfo>
                            <UserAvatar sx={{ background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)' }}>
                                <PersonIcon />
                            </UserAvatar>
                            <Box>
                                <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                                    {call.name || 'Other User'}
                                </Typography>
                                <StatusChip 
                                    icon={<VideocamIcon sx={{ fontSize: '16px !important' }} />} 
                                    label="Live" 
                                    size="small" 
                                />
                            </Box>
                        </UserInfo>
                        <StatusChip 
                            icon={<MicIcon sx={{ fontSize: '16px !important' }} />} 
                            label="Audio On" 
                            size="small" 
                        />
                    </UserHeader>
                    <VideoElement 
                        playsInline 
                        ref={userVideo} 
                        autoPlay 
                    />
                </VideoPaper>
            )}
        </VideoContainer>
    );
};

export default VideoPlayer;