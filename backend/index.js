
import express from 'express';
import cors from 'cors';  // Import CORS
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aesRoutes from './routes/aesRoutes.js';
dotenv.config();

const app = express();
const server = http.createServer(app);

// Update CORS configuration
const FRONTEND_ORIGIN = 'https://secure-chat-group.vercel.app';


app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
  credentials: true,  // Allow credentials (cookies, authorization headers)
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/aes', aesRoutes);
// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// MongoDB connection and starting server
mongoose.connect(process.env.MONGO_URI, { dbName: 'secureChat' })
  .then(() => {
    console.log('MongoDB connected');
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`🚀Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(' DB connection error:', err.message);
  });

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin:FRONTEND_ORIGIN,  // Same allowed origins for Socket.IO
    methods: ['GET', 'POST'],
    credentials: true,  // Allow credentials (cookies, authorization headers)
  },
});

io.on('connection', (socket) => {
  console.log(' User connected:', socket.id);
  // Add socket events here...
});



