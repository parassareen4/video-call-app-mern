# Counseling Platform - Video Call App

A professional video counseling platform built with MERN stack, featuring real-time video calls between counselors and clients.

## 🚀 Features

- **Role-Based Access**: Separate interfaces for Admin/Counselors and Clients
- **Queue Management**: Clients join a queue and wait for counselors
- **Real-Time Video Calls**: WebRTC-powered video/audio communication
- **Professional Routing**: Clean URL structure with dedicated endpoints
- **Responsive Design**: Works on desktop and mobile devices
- **Live Dashboard**: Admin can see all waiting clients and initiate calls

## 🏗️ Architecture

### Frontend Routes
- `/` - Home page with role selection
- `/admin` - Counselor/Admin dashboard
- `/client` - Client queue and session interface

### Technology Stack
- **Frontend**: React 18, Material-UI, React Router, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO
- **Video**: WebRTC with simple-peer
- **Real-time**: Socket.IO for signaling and queue management

## 📱 Access URLs

### Desktop
- Home: `http://192.168.1.10:3000/`
- Admin: `http://192.168.1.10:3000/admin`
- Client: `http://192.168.1.10:3000/client`

### Mobile
- Home: `http://192.168.1.10:3000/`
- Admin: `http://192.168.1.10:3000/admin`
- Client: `http://192.168.1.10:3000/client`

## ⚡ Setup

### Server
```bash
cd server
npm install
npm start  # Runs on port 5050
```

### Client
```bash
cd client
npm install --legacy-peer-deps
npm start  # Runs on port 3000
```

## 🎯 How It Works

1. **Counselors** go to `/admin` → Enter name → See client queue → Click "Call Client"
2. **Clients** go to `/client` → Enter name → Wait in queue → Get called by counselor
3. **Video Session** starts automatically when counselor initiates call
4. **After Session** client returns to queue, counselor returns to dashboard

## 🔧 Development

The app automatically detects your network IP and configures Socket.IO accordingly. Both server and client are configured to work on your local network for mobile testing.

## 📋 Queue System

- Clients see their queue position in real-time
- Admins see all waiting clients with names and positions
- Automatic queue updates when clients join/leave
- Call history and session management
