const diningReserv = require("../../Models/receptionDiningModel");

//get all reservations
const getAllReservations = async (req, res) => {
  try {
    const DiningReservation = await diningReserv.find({});
    res.status(200).json(DiningReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReservations,
};
