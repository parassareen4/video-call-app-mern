import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('video-call-app-mern-production.up.railway.app/');

const ContextProvider = ({ children }) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [Name, setName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [waitingClients, setWaitingClients] = useState([]);
    const [queuePosition, setQueuePosition] = useState(null);
    const [isReconnecting, setIsReconnecting] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.on('me', (id) => setMe(id));

        // Connection state management
        socket.on('connect', () => {
            setIsReconnecting(false);
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            setIsReconnecting(true);
            console.log('Disconnected from server');
        });

        socket.on('reconnect', () => {
            setIsReconnecting(false);
            console.log('Reconnected to server');
            // Rejoin room if user was previously connected
            if (userRole && Name) {
                socket.emit('join', { role: userRole, name: Name });
            }
        });

        // Admin-specific events
        socket.on('clientsUpdate', (clients) => {
            setWaitingClients(clients);
        });

        // Client-specific events
        socket.on('queuePosition', (position) => {
            setQueuePosition(position);
        });

        socket.on('adminCalling', () => {
            // Admin is calling - auto-accept for simplicity
            setCall({ isReceivedCall: true, from: 'admin', name: 'Counselor', signal: null });
        });

        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

        return () => {
            socket.off('me');
            socket.off('connect');
            socket.off('disconnect');
            socket.off('reconnect');
            socket.off('clientsUpdate');
            socket.off('queuePosition');
            socket.off('adminCalling');
            socket.off('calluser');
        };
    }, [userRole, Name]);

    // Set video stream when stream is available
    useEffect(() => {
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;
            console.log('Video stream updated:', stream);
        }
    }, [stream]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        // Only signal if we have valid signal data
        if (call.signal) {
            peer.signal(call.signal);
        }

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name: Name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        // Safely destroy peer connection
        if (connectionRef.current) {
            try {
                connectionRef.current.destroy();
            } catch (err) {
                console.log('Peer already destroyed');
            }
        }
        
        // Stop video stream to turn off camera
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            setStream(null);
        }
        
        // Clear video elements
        if (myVideo.current) {
            myVideo.current.srcObject = null;
        }
        if (userVideo.current) {
            userVideo.current.srcObject = null;
        }
        
        // Notify server that call ended
        socket.emit('callEnded');

        // Reset call state and reload to ensure clean state
        setTimeout(() => {
            setCall({});
            setCallAccepted(false);
            setCallEnded(false);
            
            // Reload page to ensure complete cleanup of WebRTC state
            window.location.reload();
        }, 500);
    }

    const joinRoom = (role, name) => {
        setUserRole(role);
        setName(name);
        
        // Request media access when joining
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(currentStream => {
            setStream(currentStream);
            // Ensure video element gets the stream
            setTimeout(() => {
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                    console.log('My video stream set:', currentStream);
                }
            }, 100);
        }).catch(err => {
            console.error('Failed to get media:', err);
        });

        socket.emit('join', { role, name });
    }

    // Admin calls client directly
    const adminCallClient = (clientId) => {
        socket.emit('adminCallClient', { clientId });
        callUser(clientId);
    }

    return (
        <SocketContext.Provider value={{ 
            call, 
            callAccepted, 
            callEnded, 
            stream, 
            myVideo, 
            userVideo, 
            Name, 
            setName, 
            me, 
            callUser, 
            leaveCall, 
            answerCall,
            joinRoom,
            userRole,
            waitingClients,
            queuePosition,
            adminCallClient,
            isReconnecting
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };