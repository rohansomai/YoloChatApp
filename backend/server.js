const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (request, response) => {
  response.send('Yolo Chat App backend is running successfully!');
});

app.get('/api/chat', (request, response) => {
  response.send(chats);
});

app.get('/api/chat/:id', (request, response) => {
  console.log(request.params.id);
  response.send(chats.find((c) => c._id === request.params.id));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Yolo Chat App backend is running successfully on ${PORT}`));
