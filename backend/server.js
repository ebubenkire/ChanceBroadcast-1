const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const Stream = require('./models/Stream');
const winston = require('winston');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// Connect Database
connectDB();

// Initialize Sentry before other middleware
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Logging configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Use morgan for HTTP request logging
app.use(morgan('combined'));

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/academy', require('./routes/academy'));
app.use('/api/auditions', require('./routes/auditions'));
app.use('/api/voting', require('./routes/voting'));
app.use('/api/streaming', require('./routes/streaming'));

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handling middleware
app.use(require('./middleware/error'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinStream', async (streamId) => {
    socket.join(streamId);
    
    try {
      const stream = await Stream.findById(streamId);
      if (stream) {
        stream.viewers.push({
          user: socket.user,
          joinedAt: new Date()
        });
        await stream.save();
        io.to(streamId).emit('viewerJoined', stream.viewers);
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('leaveStream', async (streamId) => {
    socket.leave(streamId);
    
    try {
      const stream = await Stream.findById(streamId);
      if (stream) {
        stream.viewers = stream.viewers.filter(
          viewer => viewer.user.toString() !== socket.user
        );
        await stream.save();
        io.to(streamId).emit('viewerLeft', stream.viewers);
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('chatMessage', async ({ streamId, message }) => {
    try {
      const stream = await Stream.findById(streamId);
      if (stream) {
        const newMessage = {
          user: socket.user,
          message,
          sentAt: new Date()
        };
        stream.chat.push(newMessage);
        await stream.save();
        io.to(streamId).emit('newChatMessage', newMessage);
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 