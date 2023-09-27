/**
 * @module event-router
 * @description This module contains functions for managing events, including creation, retrieval, deletion, and updating.
 * @type {object}
 * @alias router
 */
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');
const path = require('path');
const Event = require("../models/event");
const Category = require("../models/category");
const Counter = require("../models/counter");
const VIEWS_PATH = path.join(__dirname, '../views/event/');
/**
 * Middleware to parse URL-encoded request bodies.
 * @name express.urlencoded
 * @function
 */
router.use(express.urlencoded({extended:true}));

/**
 * Route to create a new event.
 * @name POST /zecan/api/v1/event
 * @function
 * @param {function} eventController.createEvent - Controller function to handle event creation.
 */
router.post('/zecan/api/v1/add-event', eventController.createEvent);

/**
 * Route to get all events.
 * @name GET /zecan/api/v1/events
 * @function
 * @param {function} eventController.getAllEvents - Controller function to handle retrieving all events.
 */
router.get('/zecan/api/v1/events', eventController.getAllEvents);

/**
 * Route to delete an event by ID.
 * @name DELETE /zecan/api/v1/delete-event
 * @function
 * @param {function} eventController.deleteEventById - Controller function to handle event deletion by ID.
 */
router.delete('/zecan/api/v1/delete-event', eventController.deleteEventById);

/**
 * Route to update an event by ID.
 * @name PUT /zecan/api/v1/update-event
 * @function
 * @param {function} eventController.updateEventById - Controller function to handle event update by ID.
 */
router.put('/zecan/api/v1/update-event', eventController.updateEventById);

/*************************************************Below are A1 APIs*********************************************************/
/**
 * Route to send the event creation form to clients.
 * @name GET /zecan/event/add
 * @function
 *
 */
router.get('/zecan/event/add', function (req, res){
    res.sendFile(VIEWS_PATH + 'addEvent.html'); //send form to clients to fill out
});
/**
 * Route to list all events.
 * @name GET /zecan/event/listall
 * @function
 * @param {Array} events - List of events to render.
 */
router.get('/zecan/event/listall', async function (req, res) {
    const events = await Event.find({});
    res.render("event/listAllEvent", {events: events});
});
/**
 * Route to handle event creation.
 * @name POST /zecan/event/add
 * @function
 * @param {function} eventController.createEvent - Controller function to handle event creation.
 */
router.post('/zecan/event/add', async function (req, res){
    let obj = req.body;
    let categoryIds = [];
    for (let i = 0; i < obj.categories.length; i++) {
        if (obj.categories[i] === ','){
            categoryIds = obj.categories.split(',');
            break;
        }
    }
    categoryIds.length === 0? categoryIds.push(obj.categories) : categoryIds;
    let categories = await Category.find({categoryID: { $in: categoryIds }});
    let anEvent = await Event.create({
        name: obj.name,
        description: obj.description,
        categories: categoryIds,
        categoryList: categories.map(category => category._id), // Store the category IDs (not the category objects
        startDate: obj.startDateTime,
        duration: obj.durationInMinutes,
        image: obj.image,
        capacity: obj.capacity||1000,
        ticketsAvailable: obj.ticketsAvailable||obj.capacity||1000,
        isActive: obj.isActive === 'on'
    });
    await Category.updateMany(
        { categoryID: { $in: categoryIds } },
        { $push: { eventsList: anEvent._id } }
    );
    await Counter.findOneAndUpdate(
        {},
        { $inc: { addCount: 1, eventsCount: 1 } },
    );
    res.redirect("/zecan/event/listall");
});

/**
 * Route to list sold-out events.
 * @name GET /zecan/event/listsoldout
 * @function
 * @param {Array} soldOutEvents - List of sold-out events to render.
 */
router.get('/zecan/event/listsoldout', async function (req, res)  {
    let soldOutEvents = await Event.find({ticketsAvailable: 0});
    res.render("event/listSoldOut", {events: soldOutEvents});
});


/**
 * Route to list events by category.
 * @name GET /zecan/category/:catID
 * @function
 * @param {string} catID - Category ID to filter events by.
 * @param {Object} categoryInfo - Information about the selected category.
 * @param {Array} events - List of events in the selected category to render.
 */
router.get('/zecan/category/:catID', async function (req, res)  {
    let dbByCategory =  await Category.findOne({categoryID: req.params.catID});
    if (!dbByCategory) {
        res.json({ error: 'Category not found' });
        return;
    } else {
        const eventIds = dbByCategory.eventsList;
        const events = await Event.find({_id: {$in: eventIds}});
        res.render("event/listByCategory", {events: events, categoryInfo: dbByCategory});
    }
});

/**
 * Route to handle invalid category requests.
 * @name GET /zecan/category
 * @function
 */
router.get('/zecan/category', function(req, res) {
    res.sendFile(VIEWS_PATH + 'invalidCategory.html');
});

/**
 * Route to remove an event by ID.
 * @name GET /zecan/event/remove
 * @function
 */
router.get('/zecan/event/remove', async function (req, res) {
    let eventID = req.query.id;

    // Check if event ID is provided
    if (eventID === undefined) {
        res.sendFile(VIEWS_PATH + 'deleteEvent.html');
    } else {
        let event = await Event.findOne({ eventID: eventID });
        if (!event) {
            res.json({ error: 'Event not found' });
            return;
        }
        await Category.updateMany(
            { _id: { $in: event.categoryList } },
            { $pull: { eventsList: event._id } }
        );
        await Event.deleteOne({ eventID: event.eventID });
        await Counter.findOneAndUpdate(
            {},
            { $inc: { deleteCount: 1, eventsCount: -1} },
        );
        res.redirect("/zecan/event/listall");
    }
});

/**
 * Task for Student 1
 * Route to show event detail.
 * @name GET /32418361/event/:eventID
 * @function
 */
router.get('/32418361/event/:eventID', async function (req, res) {
    let aEvent =  await Event.findOne({eventID: req.params.eventID});
    listContainer = [];
    listContainer.push(aEvent);
    if (!aEvent) {
        res.json({ error: 'Event not found' });
        return;
    } else {
        res.render("event/eventDetails", {events: listContainer});
    }
});

module.exports = router;