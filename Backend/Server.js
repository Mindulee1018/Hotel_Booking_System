require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");

const userRoutes = require("./Routes/user");
const roominventoryRoutes = require("./Routes/roominventory");
const RoomRestockRoutes = require("./Routes/RoomRestock");
const offerRoutes = require("./Routes/offers");

const watersportRoutes = require("./Routes/watersport");
const WatersportReservationRoutes = require("./Routes/WatersportReservation");

const tableRoutes = require("./Routes/table");
const menuRoutes = require("./Routes/menu");
const orderRoutes = require("./Routes/order");
const buffetRoutes = require("./Routes/buffet");
const RoomReservation = require("./Routes/roomReservation");
const diningReservationRoutes = require("./Routes/DiningReservation");

const room = require("./Routes/room");
const roomType = require("./Routes/roomType");

const hotelRoutes = require("./Routes/HotelSchema");
const kitchenStockRoutes = require("./Routes/kitchenStock");
const paymentRoutes = require("./Routes/payment");
const kitchenBulkStockRoutes = require("./Routes/kitchenBulkStock");

const notification = require("./Routes/notification");
const userEmails = require("./Routes/userEmails");
const notificationRoutes = require('./Routes/MulLoginFailNoti');

const  hallRoutes  =require('./Routes/hallRoutes');

const HallReservations =require('./Routes/hallReservations')

const deleteUnverifiedAccounts = require('./controllers/deleteUnverifiedAcc')

//const combinedStockRoutes = require ('./Routes/combinedStock')
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use("/user", userRoutes);
app.use("/roominventory", roominventoryRoutes);
app.use("/RoomRestock", RoomRestockRoutes);
app.use("/offer", offerRoutes);
app.use("/watersport", watersportRoutes);
app.use("/watersportReservation", WatersportReservationRoutes);
app.use("/tables", diningReservationRoutes);
app.use("/table", tableRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/buffet", buffetRoutes);
app.use("/roomreservation", RoomReservation);
app.use("/room", room);
app.use("/roomType", roomType);
app.use("/hotel", hotelRoutes);
app.use("/kitchenStock", kitchenStockRoutes);
app.use("/payment", paymentRoutes);
app.use("/kitchenBulkStock", kitchenBulkStockRoutes);
app.use("/notification", notification);
app.use("/userEmails", userEmails)
app.use("/adminnotify",notificationRoutes)
app.use('/hall',hallRoutes)
app.use('/hallR',HallReservations)

// Start the scheduled task for deleting unverified accounts
deleteUnverifiedAccounts(); 
cron.schedule('0 0 * * *', deleteUnverifiedAccounts);

// connect to db
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
