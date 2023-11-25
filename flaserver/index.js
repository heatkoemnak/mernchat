const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
const userRoute = require('./routes/user.route');

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const mongodbURL = process.env.mongoURL;
console.log(mongodbURL);
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

app.use('/api', userRoute);
