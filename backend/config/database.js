const mongoose = require('mongoose');
require('dotenv').config();
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_HOST=process.env.DB_HOST;
const DB_PORT=process.env.DB_PORT;
const DB_DATABASE=process.env.DB_DATABASE;
const DB_AUTHSOURCE= process.env.DB_AUTHSOURCE;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=${DB_AUTHSOURCE}`).then(db => {
    console.log(`DB is connected in ${db.connection.host}`);
    console.log(`DB is connected in PORT: ${db.connection.port}`);
}).catch(err => console.log(err));

module.exports = mongoose;