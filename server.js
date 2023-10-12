/**
 * Create Express Server
 *
 * This module creates an Express server to handle HTTP requests. It sets up
 * middlewares, routes, and starts the server on a specified port.
 *
 * @module ExpressServer
 */

/**
 * Express Application
 *
 * An instance of the Express application that will handle HTTP requests.
 *
 * @type {object}
 * @alias app
 */
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const server = require('http').Server(app);
const io = require('socket.io')(server);
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({key: 'AIzaSyByOppElzgMpQ6nMGdtX60ju8r6ULArYPU'});

io.on('connection', (socket) => {
   socket.on('inputString', async (data) => {
       const translatedText = await translate.translate(data.text, data.language);
       io.emit('translatedText', translatedText[0]);
   });

});

/**
 * Connect to MongoDB
 *
 * This asynchronous function connects the server to a MongoDB database.
 *
 * @async
 * @function
 */
async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test'); //for some reason, it doesn't work with the 'localhost' keyword
    console.log("Connected to MongoDB");
}
connect()
    .catch((err) => console.log(err))

let counterInstance;

/**
 * Create Counter Instance
 *
 * This asynchronous function creates a counter instance for tracking records.
 *
 * @async
 * @function
 */
async function createCounter(){
    const Counter = require("./backend/models/counter");
    counterInstance = await Counter.create({});
}

createCounter().catch((err) => console.log(err));


/**
 * File System Path
 *
 * The path module is used to work with file system paths. It's used here
 * to locate view files and other resources.
 *
 * @type {object}
 * @alias path
 */
const path = require("path");

/**
 * Setting Up Middlewares
 *
 * This block configures various middlewares to be used by the server.
 * It serves Bootstrap CSS files and static images from specified directories.
 */

app.use(express.static(path.join(__dirname, 'assignment3/dist/assignment3')));


/**
 * Configuring Routes for Categories - Student 1 Tasks - Carter Chin
 *
 * This block imports and uses the router for category-related routes.
 * It maps the router to the root URL path ('/') to handle category-related requests.
 */
const counterRouter = require("./backend/routes/counter_router");
app.use('/', counterRouter);

const routerCategory = require("./backend/routes/category_json_router");
app.use('/', routerCategory);

/**
 * Configuring Routes for Events - Student 2 Tasks - Zecan Liu
 *
 * This block imports and uses the router for event-related routes.
 * It maps the router to the root URL path ('/') to handle event-related requests.
 */
const eventRouter = require("./backend/routes/event_json_router");
app.use('/', eventRouter);


app.get("*", function (request, response) {
    response.redirect('/');
});

/**
 * Start Server
 *
 * This block starts the server on the specified port (8080).
 *
 * @constant
 * @type {number}
 * @default
 */
const PORT_NUMBER = 8080;
server.listen(PORT_NUMBER);
