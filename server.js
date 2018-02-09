'use strict';

var express     = require('express')
var app         = express();
var routes      = require('./API/routes/index'); //importing the routes
var config      = require('./config/config'); // get our config file
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var cors        = require('cors');

// Database configuration - connection with crateDBADMIN
var crate = require('node-crate');
crate.connect(config.crateDBAdmin);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//CORS
app.use(cors())

// ROUTES FOR OUR API
// =============================================================================
app.use('/api', routes)

//Middleware to catch and handle a 404 error
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

/* Configuracion del puerto*/
const port = process.env.PORT || '3700';// used to create, sign, and verify tokens
app.set('port', port);
/* Servidor en escucha de acuerdo al puerto especificado.*/
app.listen(port, () => console.log(` Web Server started on:${port}`));
 
module.exports = app;
