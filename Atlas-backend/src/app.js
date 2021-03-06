require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users.routes');
const moviesRoutes = require('./routes/movies.routes');

const apiErrorHandler = require('./error/api-error-handler');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);
app.use('/', userRoutes);
app.use('/', moviesRoutes);

app.use(apiErrorHandler);

app.listen(process.env.PORT || 8080);
