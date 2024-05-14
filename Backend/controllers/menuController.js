const { ObjectId } = require("mongodb");
const menu = require("../Models/menuModel");
const mongoose = require("mongoose");

//get all reservations
const getAllMenuDetails = async (req, res) => {
  try {
    const menuList = await menu.find({});

    res.status(200).json(menuList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get category by category name
const getCategoryByName = async (req, res) => {
  const { category } = req.params;  // Get the category from the request parameters
  try {
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const menuList = await menu.find({ category: category });

    if (menuList.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }

    res.status(200).json(menuList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//create a menu 
const createMenuItem = async (req, res) => {
  const { category, productName, Price } = req.body;
  let imageData = {};

  console.log(req.file, "file");

  if (req.file) {
    //Assuming the file is uploaded and accessible via req.file
    imageData = {
      data: req.file.buffer, // Buffer containing file data
      contentType: req.file.mimetype, // Mime type of the file
    };
  } else {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const newMenu = await menu.create({
      category,
      productName,
      Price,
      Image: imageData, // Store the image data directly
    });
    res.status(201).json(newMenu); // Respond with the created document
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to update an existing activity
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, Price } = req.body;

    // Find the menu item by ID and update its name and price
    const updatedMenuItem = await menu.findByIdAndUpdate(
      id,
      { productName, Price },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params; // Capture the `id` from URL parameters
    // Validate id format to ensure it is a valid ObjectId

    console.log(id, "deleteMenuItem");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await menu.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    res.status(200).json({ message: "Menu Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Route to get menu items by category
const getMenuItemsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    // Query the database for menu items by category
    const menuItems = await menu.find({ category });

    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllMenuDetails,
  getCategoryByName,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByCategory
};
