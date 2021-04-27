const express = require('express')
const app = express();
const mongoose = require('mongoose'); 
require('dotenv').config()

const url = 'mongodb://127.0.0.1:27017/shaadi'

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`MongoDB database connected`)
} )

app.use(express.json())

const users = require('./routes/user')



app.use('/api/', users)


app.listen(4000, () => console.log('server is running on port'));