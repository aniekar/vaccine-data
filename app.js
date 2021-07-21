const { load } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const config = require('./utils/config');
const loadData = require('./utils/dataLoader');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

loadData();

const app = express();
app.use(express.json());

module.exports = app;
