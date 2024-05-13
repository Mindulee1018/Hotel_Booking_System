const { default: mongoose } = require("mongoose");
const notification = require("../Models/notificationService");

//get all notifications
const getNotification = async (req, res) => {
  try {
    const notifications = await notification.find({}); //get all data

    res.status(200).json(notifications); //send to browser
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Add a notification
const addNotification = async (req, res) => {
  const { email, roomNumbers, Message } = req.body; // Correct the variable name 'status' to 'Status'

  try {
    const newNotification = await notification.create({
        email,
        roomNumbers,
        Message,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "Attempting to delete reservation");

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(id, "Invalid ID format");
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await notification.findByIdAndDelete(id);

    if (!result) {
      console.log(id, "Notification not found");
      return res.status(404).json({ message: "Notification not found" });
    }

    console.log(id, "Notification deleted successfully");
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting Notification:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getNotification, addNotification, deleteNotification };