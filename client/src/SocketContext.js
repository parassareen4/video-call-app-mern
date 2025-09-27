import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://192.168.1.10:5050');

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
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.on('me', (id) => setMe(id));

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
            socket.off('clientsUpdate');
            socket.off('queuePosition');
            socket.off('adminCalling');
            socket.off('calluser');
        };
    }, []);

    // console.log(me);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream: stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

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

        connectionRef.current.destroy();
        
        // Notify server that call ended
        socket.emit('callEnded');

        // Reset call state
        setCall({});
        setCallAccepted(false);
        setCallEnded(false);

        // Stop video stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
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
            if (myVideo.current) {
                myVideo.current.srcObject = currentStream;
            }
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
            adminCallClient
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };










