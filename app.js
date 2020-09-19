const http = require('http');

const express = require('express');

const flightsRoute = require('./routes/filghts');

const app = express();

app.get('/flights', flightsRoute)

const server = http.createServer(app);

server.listen(8080)