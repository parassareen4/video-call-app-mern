import React, { useContext, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { SocketContext } from '../../SocketContext';
import './VideoPlayer.css';

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
        <Grid container className='gridContainer'>
            {/* OWN Video */}
            {
                stream && (
                    <Paper className='paper'>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' gutterBottom> {Name || 'You'} </Typography>
                            <video 
                                playsInline 
                                muted 
                                ref={myVideo} 
                                autoPlay 
                                className='video'
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Paper>
                )
            }

            {/* Users Video */}
            {
                callAccepted && !callEnded && (
                    <Paper className='paper'>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' gutterBottom> {call.name || 'Other User'} </Typography>
                            <video 
                                playsInline 
                                ref={userVideo} 
                                autoPlay 
                                className='video'
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>
                    </Paper>
                )
            }

        </Grid>
    )
}

export default VideoPlayer;