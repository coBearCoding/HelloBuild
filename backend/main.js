const express = require('express');
const app = express();

const settings = require('./config/index.config');

const PORT = process.env.PORT || 3000;


app.use(settings);


app.listen(PORT, ()=> {
    console.log(`Server Running in PORT: ${PORT}`);
});