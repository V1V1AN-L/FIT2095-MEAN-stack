const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');

/**
 * Middleware to parse URL-encoded request bodies.
 * @name express.urlencoded
 * @function
 * @memberof router
 */
router.use(express.urlencoded({extended:true}));

/**
 * Route to create a new category.
 * @name POST /api/v1/category/32418361/add
 * @function
 * @memberof router
 * @param {function} categoryController.createCategory - Controller function to handle category creation.
 */
router.post('/api/v1/add-category', categoryController.createCategory);

/**
 * Route to get all categories.
 * @name GET /api/v1/category/32418361/list
 * @function
 * @memberof router
 * @param {function} categoryController.getAllCategories - Controller function to handle retrieving all categories.
 */
router.get('/api/v1/list-category', categoryController.getAllCategories);

/**
 * Route to delete an category by ID.
 * @name DELETE /api/v1/category/32418361/delete
 * @function
 * @memberof router
 * @param {function} categoryController.deleteCategoryById - Controller function to handle category deletion by ID.
 */
// router.delete('/api/v1/category/32418361/delete', categoryController.deleteCategoryById);

// /**
//  * Route to update an category by ID.
//  * @name PUT /api/v1/category/32418361/update
//  * @function
//  * @memberof router
//  * @param {function} categoryController.updateCategoryById - Controller function to handle category update by ID.
//  */
// router.put('/api/v1/category/32418361/update', categoryController.updateCategoryById);


module.exports = router;