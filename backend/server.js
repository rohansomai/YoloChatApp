const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler, errorLogger } = require('./middlewares/error.middleware');
const cors = require('cors');
const AWS = require('aws-sdk');

dotenv.config(); // To mount the env file
connectToDB(); // connection to db

// Configure AWS SDK with your credentials and region from .env
AWS.config.update({
  accessKeyId: 'AKIA47O6JC5YWT2EMA6S',
  secretAccessKey: 'WYdbFFB5Lp+GpT4YXAyjCX0O+mJqnl3/uVgPs8QJ',
  region: 'ap-south-1',
});

const app = express();
app.use(cors());
app.use(express.json()); // Accepting request in JSON format

app.get('/', (request, response) => {
  response.send('Yolo Chat App backend is running successfully!');
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);
app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Yolo Chat App backend is running successfully on ${PORT}`));
