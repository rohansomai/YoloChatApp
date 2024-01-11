const express = require('express');
const dotenv = require('dotenv');
const { connectToDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler, errorLogger } = require('./middlewares/error.middleware');
const cors = require('cors');

dotenv.config(); // To mount the env file
connectToDB(); // connection to db

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
