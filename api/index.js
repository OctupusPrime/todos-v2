const config = require('./config');
const express = require('express');
const routes = require('./router');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', routes.authRoutes)
app.use('/tasks', routes.tasksRoutes)

const { moungoUri } = config.app;

const start = async () => {
    try {
        await mongoose.connect(moungoUri, {//Connect mongoose
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (e) {
        console.log(e);
    }
}

start();

module.exports = {
    path: "/api/",
    handler: app
}