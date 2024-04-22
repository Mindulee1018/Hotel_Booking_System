const { ObjectId } = require("mongodb");
const Order = require("../Models/orderModel");
const mongoose = require("mongoose");

//get all reservations
const getAllOrders = async (req, res) => {
  const order = await Order.find({}).sort({ createdAt: -1 });

  res.status(200).json(order);
};

//create a new reservation
const createOrder = async (req, res) => {
  const { orderNumber, productName,Quantity,Price,cusName,email, contactNumber,Total } = req.body;

  //add doc to db
  try {
    const order = await Order.create({
      orderNumber,
      productName,
      Quantity,
      Price,
      cusName,
      email,
      contactNumber,
      Total
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a reservation
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const order = await Order.findOneAndDelete({ _id: id });

  if (!order) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(order);
};


module.exports = {
  createOrder,
  getAllOrders,
  deleteOrder,
};
