const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoute = require('./routes/user.route');
const MessagesRoute = require('./routes/messages.route');
const ConversationRoute = require('./routes/conversation.route');
const { Server } = require('socket.io');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

let OnlineUser = [];
const AddNewUser = (userId, socketId) => {
  !OnlineUser.some((user) => user.userId == userId) &&
    OnlineUser.push({ userId, socketId });
  return OnlineUser;
};

const getUser = (userId) => {
  return OnlineUser.find((u) => u.userId === userId);
};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('send_user', (user) => {
    console.log(user);
    const userList = AddNewUser(user, socket.id);
    console.log(userList);
  });
  socket.on('send_message', (data) => {
    const receiver = getUser(data?.receiverId);
    console.log(receiver);
    io.to(receiver?.socketId).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    OnlineUser.find((onlineUser) => onlineUser.socketId !== socket.id);
  });
});
const mongodbURL = process.env.mongoURL;
console.log(process.env.mongoURL);
console.log(process.env.TOKEN_SECRET);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.log('failed to connect mongodb', err);
  });
server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.use('/', userRoute);
app.use('/', MessagesRoute);
app.use('/', ConversationRoute);
