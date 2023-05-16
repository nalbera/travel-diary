const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const createDir = require('../src/services/createDir');

const userRouter = require('../src/routes/userRouter');
const entriesRouter = require('../src/routes/entriesRouter');

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(morgan('dev'));
server.use(fileUpload());

const staticDir = path.join(__dirname,'upload');

server.use(express.static(staticDir));

createDir(staticDir);

server.get('/', (req,res) => {
    res.send("<h3>I'm here </h3>");
});

server.use(userRouter);
server.use(entriesRouter);

server.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;