import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './features/auth/routes';
import feedRoutes from './features/feed/routes';
import crushRoutes from './features/crush/routes';
import matchRoutes from './features/matches/routes';
import chatRoutes from './features/chat/routes';
import eventRoutes from './features/events/routes';
import coinRoutes from './features/coins/routes';
import spotlightRoutes from './features/spotlight/routes';
import safemeetRoutes from './features/safemeet/routes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Debugging Instrumentation (API Entry/Exit)
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`[>>] ${req.method} ${req.url}`);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[<<] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/crush', crushRoutes);
app.use('/matches', matchRoutes);
app.use('/chat', chatRoutes);
app.use('/events', eventRoutes);
app.use('/coins', coinRoutes);
app.use('/spotlight', spotlightRoutes);
app.use('/safemeet', safemeetRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };
