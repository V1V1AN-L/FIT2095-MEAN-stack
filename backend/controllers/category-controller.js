const Category = require("../models/category");
const Counter = require("../models/counter");
const Event = require("../models/event");

// Create a category
async function createCategory(req, res) {
    // Extract category data from the request.
    let obj = req.body;

    try {
        // Create a new category in the database.
        let aCategory = await Category.create({
            name: obj.name,
            description: obj.description,
            image: obj.image,
        });

        // Increment the category counter.
        await Counter.findOneAndUpdate(
            {},
            { $inc: { addCount: 1, categoriesCount: 1 } },
        );

        // Respond with the newly created category's ID.
        res.json({ categoryID: aCategory.categoryID });
    } catch (err) {
        // Handle errors and send an error response.
        res.status(400).json({ error: "Invalid data" });
    }
}

// Get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await Category.find().populate('eventsList');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    createCategory,
    getAllCategories, // Add the new function to the exports
};
