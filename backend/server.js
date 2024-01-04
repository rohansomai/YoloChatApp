const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json()); // Accepting request in JSON format
dotenv.config(); // To mount the env file
connectToDB(); // connection to db

app.get('/', (request, response) => {
  response.send('Yolo Chat App backend is running successfully!');
});

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Yolo Chat App backend is running successfully on ${PORT}`));
