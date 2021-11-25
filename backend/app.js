const express = require('express');
const helmet = require('helmet');
require('dotenv').config()
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const threadsRoutes = require('./routes/thread');
const postsRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DATABASE}`
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/threads', threadsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
