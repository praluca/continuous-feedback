'use strict'
require('dotenv').config({silent:true})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({silent: true})
const session = require('express-session')

const app=express()
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
	next();
  })
app.use(bodyParser.json())
app.use(cors())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use('/user-api', require('./routers/users.js'))
app.use('/events-api', require('./routers/events.js'))
app.use('/feedback-api', require('./routers/feedback.js'))
app.listen(3000, () => {
	console.log('  _____                                                                _______                   \r\n \/ ____|                       \/\\                                     |__   __|                  \r\n| (___  _   _ _ __   ___ _ __ \/  \\__      _____  ___  ___  _ __ ___   ___| | ___  __ _ _ __ ___  \r\n \\___ \\| | | | \'_ \\ \/ _ \\ \'__\/ \/\\ \\ \\ \/\\ \/ \/ _ \\\/ __|\/ _ \\| \'_ ` _ \\ \/ _ \\ |\/ _ \\\/ _` | \'_ ` _ \\ \r\n ____) | |_| | |_) |  __\/ | \/ ____ \\ V  V \/  __\/\\__ \\ (_) | | | | | |  __\/ |  __\/ (_| | | | | | |\r\n|_____\/ \\__,_| .__\/ \\___|_|\/_\/    \\_\\_\/\\_\/ \\___||___\/\\___\/|_| |_| |_|\\___|_|\\___|\\__,_|_| |_| |_|\r\n             | |                                                                                 \r\n             |_|                                                                                 ')
	console.log('Server is starting on port 3000')

})