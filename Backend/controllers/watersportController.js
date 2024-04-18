const { default: mongoose } = require("mongoose");
const Watersport = require("../Models/watersportsModel");

// Function to add a new activity
// const AddActivity = async (req, res) => {
//   const { Activity, Time, Price, Description, Image } = req.body;

//   try {
//     const newActivity = await Watersport.create({
//       Activity,
//       Time,
//       Price,
//       Description,
//       Image,
//     });
//     res.status(201).json(newActivity); // Respond with the created document
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const AddActivity = async (req, res) => {
  const { Activity, Time, Price, qtyPerRound } = req.body;
  let imageData = {};

  console.log(req.file, "file");

  if (req.file) {
    // Assuming the file is uploaded and accessible via req.file
    imageData = {
      data: req.file.buffer, // Buffer containing file data
      contentType: req.file.mimetype, // Mime type of the file
    };
  } else {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    const newActivity = await Watersport.create({
      Activity,
      Time,
      Price,
      
      qtyPerRound,
      
      Image: imageData, // Store the image data directly
    });
    res.status(201).json(newActivity); // Respond with the created document
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to get all activities
const getActivity = async (req, res) => {
  try {
    const activities = await Watersport.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update an existing activity
const updateActivity = async (req, res) => {
  const { activityName } = req.params; // The name of the activity to update
  const { Activity, Time, Price, qtyPerRound } = req.body; // The new data for the activity

  try {
    const updatedActivity = await Watersport.findOneAndUpdate(
      { Activity: activityName }, // Find a document by its activity name
      { Activity, Time, Price, qtyPerRound }, // The new values
      { new: true } // Option to return the document after update
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete an activity by name
// const deleteActivity = async (req, res) => {
//   console.log(req, "file");
//   try {
//     const { activityName } = req.params; // Assuming you're getting the activity name from the route parameter
//     const result = await Watersport.findOneAndDelete({
//       Activity: activityName,
//     });

//     if (!result) {
//       return res.status(404).json({ message: "Activity not found" });
//     }

//     res.status(200).json({ message: "Activity deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params; // Capture the `id` from URL parameters
    // Validate id format to ensure it is a valid ObjectId

    console.log(id, "deleteActivity");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await Watersport.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { AddActivity, getActivity, deleteActivity, updateActivity };
