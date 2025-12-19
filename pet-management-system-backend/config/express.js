const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());

module.exports = app;