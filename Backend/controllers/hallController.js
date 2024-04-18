// hallController.js
const { default: mongoose } = require('mongoose')
const Hall = require('../Models/hallModel');

// Get all halls
const getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find();
        res.json(halls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
const getHallById = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid hall ID' });
        }

        // Find the hall by its ID
        const hall = await Hall.findById(id);
        
        // If the hall is not found, return 404 Not Found status
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        // Return the hall if found
        res.json(hall);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
// Create a new hall
const createHall = async (req, res) => {
    const { Name } = req.body;

    try {
        // Check if a hall with the same name already exists
        const existingHall = await Hall.findOne({ Name });

        if (existingHall) {
            return res.status(400).json({ error: 'Hall with this name already exists' });
        }

        // If no existing hall found, create a new one
        const newHall = new Hall(req.body);
        await newHall.save();
        res.status(201).json(newHall);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateHall = async (req, res) => {
    const { id } = req.params;
    const { Name, description, capacity, price ,facilities} = req.body;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid hall ID' });
        }

        // Check if the hall exists in the database
        const hall = await Hall.findById(id);
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        // Build the update object based on fields that have changed
        const updateFields = {};
        if (Name) updateFields.Name = Name;
        if (description) updateFields.description = description;
        if (capacity) updateFields.capacity = capacity;
        if (price) updateFields.price = price;
        if(facilities)updateFields.facilities=facilities;

        // Update the hall only if at least one field has changed
        if (Object.keys(updateFields).length > 0) {
            const updatedHall = await Hall.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
            res.json(updatedHall);
        } else {
            res.json({ message: 'No changes detected' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const removeHall = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid hall ID' });
        }

        // Check if the hall exists in the database
        const hall = await Hall.findById(id);
        if (!hall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        // Remove the hall from the database
        await Hall.findByIdAndRemove(id);

        res.json({ message: 'Hall removed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};





module.exports={ getAllHalls,createHall,updateHall,removeHall,getHallById}
