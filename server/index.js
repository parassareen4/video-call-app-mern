const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST']
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Counseling Platform');
});

// Store connected users
const connectedUsers = new Map(); // socketId -> {role, name, status}
const waitingClients = []; // queue of client socket IDs
let adminSocket = null;

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.emit('me', socket.id);

    // User joins as client or admin
    socket.on('join', ({ role, name }) => {
        connectedUsers.set(socket.id, { role, name, status: 'available' });
        
        if (role === 'admin') {
            adminSocket = socket.id;
            console.log('Admin connected:', name);
            // Send current waiting clients to admin
            socket.emit('clientsUpdate', getWaitingClientsInfo());
        } else if (role === 'client') {
            waitingClients.push(socket.id);
            console.log('Client joined queue:', name);
            
            // Notify client of their queue position
            socket.emit('queuePosition', waitingClients.indexOf(socket.id) + 1);
            
            // Notify admin of new client
            if (adminSocket) {
                io.to(adminSocket).emit('clientsUpdate', getWaitingClientsInfo());
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        const user = connectedUsers.get(socket.id);
        if (user) {
            if (user.role === 'admin') {
                adminSocket = null;
            } else if (user.role === 'client') {
                // Remove from waiting queue
                const index = waitingClients.indexOf(socket.id);
                if (index > -1) {
                    waitingClients.splice(index, 1);
                }
                
                // Update queue positions for remaining clients
                updateQueuePositions();
                
                // Notify admin
                if (adminSocket) {
                    io.to(adminSocket).emit('clientsUpdate', getWaitingClientsInfo());
                }
            }
        }
        
        connectedUsers.delete(socket.id);
    });

    // Admin initiates call to client
    socket.on('adminCallClient', ({ clientId }) => {
        if (connectedUsers.get(socket.id)?.role === 'admin') {
            // Remove client from waiting queue
            const clientIndex = waitingClients.indexOf(clientId);
            if (clientIndex > -1) {
                waitingClients.splice(clientIndex, 1);
                updateQueuePositions();
            }
            
            // Notify client of incoming call from admin
            io.to(clientId).emit('adminCalling');
            
            // Update admin dashboard
            io.to(adminSocket).emit('clientsUpdate', getWaitingClientsInfo());
        }
    });

    // Original call handling (modified for admin-client calls)
    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('calluser', { signal: signalData, from, name });
    });

    socket.on('answercall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    });

    // Call ended - return client to queue
    socket.on('callEnded', () => {
        const user = connectedUsers.get(socket.id);
        if (user?.role === 'client' && !waitingClients.includes(socket.id)) {
            waitingClients.push(socket.id);
            updateQueuePositions();
            
            if (adminSocket) {
                io.to(adminSocket).emit('clientsUpdate', getWaitingClientsInfo());
            }
        }
    });
});

function getWaitingClientsInfo() {
    return waitingClients.map((socketId, index) => {
        const user = connectedUsers.get(socketId);
        return {
            id: socketId,
            name: user?.name || 'Anonymous',
            position: index + 1
        };
    });
}

function updateQueuePositions() {
    waitingClients.forEach((socketId, index) => {
        io.to(socketId).emit('queuePosition', index + 1);
    });
}

const port = process.env.PORT || 5050;
server.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}/`)
})
