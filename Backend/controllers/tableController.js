const { ObjectId } = require("mongodb");
const Table = require("../Models/tableModel");
const Reservation = require("../Models/TableReservationsModel")
const mongoose = require("mongoose");

//get all reservations
// const getAllReservations = async (req, res) => {
//   const table = await Table.find({}).sort({ createdAt: -1 });

//   res.status(200).json(table);
// };

//get a single reservation
const getSingleReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findById(id);

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};


// // Function to check table availability
// const isTableAvailable = async (tableId, date, timeSlot) => {
//   const reservations = await Reservation.find({ tableId, date, timeSlot });
//   return reservations.length === 0; 
// };

// //create a new reservation
// const createReservation = async (req, res) => {
//   const { tableId, date, timeSlot, customerName, email, contactNumber } = req.body;

//   try {

//     const isAvailable = await isTableAvailable(tableId, date, timeSlot);

//     if (!isAvailable) {
//       return res.status(400).json({ message: 'Table is not available at this time.' });
//     }

//     const newReservation = new Reservation({
//       tableId,
//       date,
//       timeSlot,
//       customerName,
//       email,
//       contactNumber,
//     });

//     await newReservation.save();
//     res.status(201).json({ message: 'Reservation created successfully!' });
//   } catch (error) {
//     console.error('Error creating reservation:', error); 
//     res.status(500).json({ message: 'Error creating reservation.', error });
//   }
// };

// //get available tables
// const getAvailableTables = async (req, res) => {
//     const { date, timeSlot } = req.params;
  
//     try {
//       const allTables = await Table.find({});
//       const reservedTables = await Reservation.find({ date, timeSlot });
  
//       const reservedTableIds = reservedTables.map((res) => res.tableId.toString());
//       const availableTables = allTables.filter((table) => !reservedTableIds.includes(table._id.toString()));
  
//       res.status(200).json({
//         availableCount: availableTables.length,
//         availableTables,
//       });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching available tables.', error });
//     }
//   };

//   //add tables
//   const addTable = async (req, res) => {
//     const { tableNumber, capacity} = req.body;
  
//     if (!tableNumber || !capacity) {
//       // Check for required fields
//       return res.status(400).json({ message: 'Table number and capacity are required.' });
//     }
  
//     try {
//       // Check if a table with the same number already exists
//       const existingTable = await Table.findOne({ tableNumber });
//       if (existingTable) {
//         return res.status(400).json({ message: `Table with number ${tableNumber} already exists.` });
//       }
  
//       // Create a new table
//       const newTable = new Table({
//         tableNumber,
//         capacity,
//       });
  
//       await newTable.save(); // Save to database
  
//       res.status(201).json({ message: 'Table created successfully!', table: newTable });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding table.', error });
//     }
//   };

const createReservation = async (req, res) => {
try {
  const { date, timeSlot, customerName, email, contactNumber } = req.body;

    // Check if the time slot is valid
    if (!timeSlot.includes(timeSlot)) {
      return res.status(400).json({
        message: 'Invalid time slot. Please select a valid time slot.',
      });
    }

    const reservationDate = new Date(date);

    // Count existing reservations for the specified date and time slot
    const reservationCount = await Reservation.countDocuments({
      date: reservationDate,
      timeSlot,
    });

    if (reservationCount > 6) {
      return res.status(409).json({
        message: 'This time slot has reached its reservation limit. Please choose another.',
      });
    }

    // Create the new reservation
    const newReservation = new Reservation({
      date: reservationDate,
      timeSlot,
      customerName,
      email,
      contactNumber,
    });

    await newReservation.save();

    res.status(201).json({
      message: 'Reservation created successfully.',
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating reservation.',
      error: error.message,
    });
  }
};

// Check availability for a specific date and time slot
const checkAvailability = async (req, res) => {
try {
  const { date, timeSlot } = req.params;

  if (!timeSlot.includes(timeSlot)) {
    return res.status(400).json({
      message: 'Invalid time slot. Please select a valid time slot.',
    });
  }

  const reservationDate = new Date(date);

  // Check if the count is within the limit
  const reservationCount = await Reservation.countDocuments({
    date: reservationDate,
    timeSlot,
  });

  const isAvailable = reservationCount < 6;

  res.status(200).json({
    available: isAvailable,
    message: isAvailable ? 'This slot is available.' : 'This slot has reached its limit.',
  });
} catch (error) {
  res.status(500).json({
    message: 'Error checking availability.',
    error: error.message,
  });
}
}

// Get all reservations
const getAllReservations = async (req, res) => {
try {
  const reservations = await Reservation.find();
  res.status(200).json(reservations);
} catch (error) {
  res.status(500).json({
    message: "Error retrieving reservations.",
    error: error.message,
  });
}
};


  

//delete a reservation
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findOneAndDelete({ _id: id });

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};

//update a reservation
const updateReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types > ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ID!" });
  }

  const table = await Table.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!table) {
    return res.status(404).json({ error: "No Reservation Details!" });
  }

  res.status(200).json(table);
};

module.exports = {
  createReservation,
  // getAvailableTables,
  getAllReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
  // addTable,
  createReservation,
checkAvailability,
getAllReservations,
};
