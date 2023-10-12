/**
 * @module event-router
 * @description This module contains functions for managing events, including creation, retrieval, deletion, and updating.
 * @type {object}
 * @alias router
 */
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event-controller');

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

/**
 * Route to get an event by ID.
 * @name GET /zecan/api/v1/event/:eventID
 * @function
 * @param {function} eventController.getEventById - Controller function to handle event retrieval by ID.
 * @param {string} eventID - Event ID to retrieve.
 */
router.post('/zecan/api/v1/display-event', eventController.getEventById);

module.exports = router;