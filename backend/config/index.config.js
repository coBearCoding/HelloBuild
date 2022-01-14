const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const routesIndex = require('../routes/api.routes');


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(routesIndex);

module.exports = app;