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

// API endpoint to get current queue status
app.get('/api/queue', (req, res) => {
    res.json({
        totalClients: waitingClients.length,
        clients: getWaitingClientsInfo(),
        adminConnected: adminSocket !== null,
        timestamp: Date.now()
    });
});

// API endpoint to get server stats
app.get('/api/stats', (req, res) => {
    res.json({
        totalConnections: connectedUsers.size,
        waitingClients: waitingClients.length,
        adminConnected: adminSocket !== null,
        totalHistoryEntries: clientHistory.size,
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

// Store connected users and persistent queue
const connectedUsers = new Map(); // socketId -> {role, name, status, joinedAt}
const waitingClients = []; // queue of client socket IDs
const clientHistory = new Map(); // persistent client data even when disconnected
let adminSocket = null;

// Cleanup old history entries (older than 24 hours)
setInterval(() => {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    for (const [socketId, data] of clientHistory.entries()) {
        if (data.lastSeen < oneDayAgo) {
            clientHistory.delete(socketId);
        }
    }
}, 60 * 60 * 1000); // Run every hour

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    socket.emit('me', socket.id);

    // User joins as client or admin
    socket.on('join', ({ role, name }) => {
        const joinedAt = Date.now();
        connectedUsers.set(socket.id, { role, name, status: 'available', joinedAt });
        
        if (role === 'admin') {
            adminSocket = socket.id;
            console.log('Admin connected:', name);
            // Send current waiting clients to admin
            socket.emit('clientsUpdate', getWaitingClientsInfo());
        } else if (role === 'client') {
            waitingClients.push(socket.id);
            clientHistory.set(socket.id, { name, joinedAt, lastSeen: joinedAt });
            console.log('Client joined queue:', name, 'Total in queue:', waitingClients.length);
            
            // Notify client of their queue position
            socket.emit('queuePosition', waitingClients.indexOf(socket.id) + 1);
            
            // Notify admin of new client (even if admin not connected)
            if (adminSocket) {
                io.to(adminSocket).emit('clientsUpdate', getWaitingClientsInfo());
            }
            
            // Log queue status for debugging
            console.log('Current queue:', getWaitingClientsInfo());
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        
        const user = connectedUsers.get(socket.id);
        if (user) {
            if (user.role === 'admin') {
                adminSocket = null;
                console.log('Admin disconnected');
            } else if (user.role === 'client') {
                // Update last seen time in history
                if (clientHistory.has(socket.id)) {
                    clientHistory.get(socket.id).lastSeen = Date.now();
                }
                
                // Remove from waiting queue
                const index = waitingClients.indexOf(socket.id);
                if (index > -1) {
                    waitingClients.splice(index, 1);
                    console.log('Client removed from queue. Remaining:', waitingClients.length);
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
