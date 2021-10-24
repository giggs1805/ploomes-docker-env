const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_DBNAME = process.env.MONGO_DB_NAME
const MONGO_CONNECTION_STRING = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DBNAME}`


const dbConfig = {
    user: process.env.DB_MONGO_USER,
    pwd: process.env.DB_MONGO_PWD
}

mongoose.connect(MONGO_CONNECTION_STRING, 
    {
        auth: {
            authSource: "admin",
        },
        user: dbConfig.user,
        pass: dbConfig.pwd
    }).then(() => {
        console.log('successfully connected to the database');
    }).catch(err => {
        console.log('error connecting to '+MONGO_URL+':'+MONGO_PORT+'/'+MONGO_DBNAME);
        console.log(err)
        process.exit();
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;