const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
require('colors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Middleware files
// const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to DevCamper API');
});

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});