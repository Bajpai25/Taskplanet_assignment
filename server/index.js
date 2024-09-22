const express = require('express');
const cors = require('cors');
const connectDB =require('./utils/database')
const { verifyToken, authorizeRoles } = require('./middleware/jwt_authentication');
const userRoutes = require('./routes/userRoutes');
const authRoutes=require('./routes/authRoutes');
const http = require('http');  
const { Server } = require('socket.io');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth',authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io on the server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow CORS for all origins
    methods: ['GET', 'POST']
  }
});

// Listen for Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Pass the `io` object to the routes that need it
app.set('io', io);

// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});


