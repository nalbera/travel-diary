const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('../src/routes/userRouter');

const server = express();

server.use(cors());
server.use(express.urlencoded({extended: false}));
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req,res) => {
    res.send("<h3>I'm here </h3>");
});

server.use(userRouter);

server.use((err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;