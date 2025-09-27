import React, { useState, useContext } from 'react';
import { AppBar, Typography } from '@mui/material';
import './App.css';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Options from './components/Options/Options';
import Notification from './components/Notification/Notification';
import RoleSelection from './components/RoleSelection/RoleSelection';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ClientQueue from './components/ClientQueue/ClientQueue';
import { SocketContext } from './SocketContext';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [nameEntered, setNameEntered] = useState(false);
  const { 
    call, 
    callAccepted, 
    callEnded, 
    stream,
    joinRoom,
    userRole,
    waitingClients,
    queuePosition 
  } = useContext(SocketContext);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleNameSubmit = (name) => {
    joinRoom(selectedRole, name);
    setNameEntered(true);
  };

  // Show role selection if no role selected
  if (!selectedRole) {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Counseling Platform
          </Typography>
        </AppBar>
        <RoleSelection onRoleSelect={handleRoleSelect} />
      </div>
    );
  }

  // Show name input if role selected but name not entered
  if (!nameEntered) {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Counseling Platform
          </Typography>
        </AppBar>
        <Options onNameSubmit={handleNameSubmit} role={selectedRole} />
      </div>
    );
  }

  // Show video call interface if call is active
  if (call.isReceivedCall && !callAccepted && !callEnded) {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Counseling Session
          </Typography>
        </AppBar>
        <Notification />
      </div>
    );
  }

  if (callAccepted && !callEnded) {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Counseling Session
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Options role={selectedRole} />
      </div>
    );
  }

  // Show appropriate dashboard based on role
  if (selectedRole === 'admin') {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Admin Dashboard - Counseling Platform
          </Typography>
        </AppBar>
        <AdminDashboard />
      </div>
    );
  }

  if (selectedRole === 'client') {
    return (
      <div className='wrapper'>
        <AppBar className='appBar' position='static' color='inherit'>
          <Typography variant='h4' align='center'>
            Counseling Platform
          </Typography>
        </AppBar>
        <ClientQueue />
      </div>
    );
  }

  return null;
}

export default App;
