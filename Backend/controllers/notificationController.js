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
  const { email, roomNumbers } = req.body; // Correct the variable name 'status' to 'Status'

  try {
    const newNotification = await notification.create({
        email,
        roomNumbers,
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getNotification, addNotification };