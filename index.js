const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.send('Service is healthy!');
});

// Export handler cho AWS Lambda
module.exports.handler = serverless(app);
