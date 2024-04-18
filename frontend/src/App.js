import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

///////////Client Side////////////

//components
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

//User login
import Home from "./Pages/Client/userLogin/Home.js";
import Signup from "./Pages/Client/userLogin/signup.js";
import PasswordReset from "./Pages/Client/userLogin/PasswordReset.js";
import ForgotPassword from "./Pages/Client/userLogin/ForgotPwd.js";

//Restaurant
import TableReservation from "./Pages/Client/restaurant/TableReservation.js";
import AddReservation from "./Pages/Client/restaurant/AddReservation.js";
import MenuByCategoryPage from "./Pages/Client/restaurant/DisplayMenu.js";
import DisplayOrders from "./Pages/Client/restaurant/DisplayFoodOrders.js";
import AddNewOrder from "./Pages/Client/restaurant/AddOrders.js";
import DisplayBuffet from "./Pages/Client/restaurant/DisplayBuffet.js";
import ManageOrders from "./Pages/Client/restaurant/DisplayOrders.js";

///////////manager side////////////

//reception
import ReceptionDashboard from "./Pages/Staff/Reception/receptionDashboard";
import AddReserv from "./Pages/Staff/Reception/addWatersportReserv";
import SelectActivity from "./Pages/Staff/Reception/SelectActivity";
import WatersportReservations from "./Pages/Staff/Reception/watersportReservations";
import PastWatersportReservations from "./Pages/Staff/Reception/pastWatersportReserv";
import DiningReservations from "./Pages/Staff/Reception/DiningReservations.js";

//user management
import AdminDash from "./Pages/Staff/userManagement/AdminDash.js";
import Staffmanage from "./Pages/Staff/userManagement/staffManage.js";
import Usermanage from "./Pages/Staff/userManagement/UserManage.js";
import AccountManage from "./Pages/Staff/userManagement/AccountManage.js";

//room management

//restaurant management
import RestaurantNavbar from "./components/RestaurantManagerNavbar";
import MenuItems from "./Pages/Staff/restaurantManager/MenuManagement.js";
import AddNewMenu from "./Pages/Staff/restaurantManager/AddMenu.js";
import UpdateMenu from "./Pages/Staff/restaurantManager/UpdateMenu.js";
import ManageBuffet from "./Pages/Staff/restaurantManager/ManageBuffets.js";
import UpdateBuffet from "./Pages/Staff/restaurantManager/UpdateBuffet.js";
import AddBuffet from "./Pages/Staff/restaurantManager/AddBuffet.js";
import ManageTableReservation from "./Pages/Staff/restaurantManager/TableReserManagement.js";

//watersport activity management
import AddActivity from "./Pages/Staff/Reception/AddActivity";
import WatersportManage from "./Pages/Staff/Reception/WatersportManagement";

//event management

import ReservationNavbar from "./components/reservationNavBar";

import InitialRedirect from "./context/initialDirect";

import ManagerDash from "./Pages/Staff/ManagerDash";
import StaffDash from "./Pages/Staff/StaffDash";




import WatersportActivities from "./Pages/WatersportActivities";
import Dashboard from "./Pages/Staff/ManagerDashboard";

//Reception




import Room from "./Pages/rooms";
import Reservation from "./Pages/reservation";
import Details from "./Pages/CustomerDetails";
import Profile from "./Pages/Staff/Profile";

import Bookings from "./Pages/Staff/Bookings";
import AddRoom from "./Pages/Staff/AddRoom.js";
import Mybookings from "./Pages/MyBookings";
import ManageRoom from "./Pages/Staff/ManageRoom.js";
import DiningNavbar from "./components/DiningNavbar";
import RoomManagerView from "./Pages/Inventory/RoomManagerView";
import Offer from "./Pages/OffersPackages/offerPackage";
import AddNewOffer from "./Pages/OffersPackages/addOffer";
// import HallList from "./Pages/staff/HallList";
// import ViewHall from "./Pages/staff/ViewHall";
// import EditHall from "./Pages/staff/EditHall";
// import HallAdminDash from "./Pages/staff/HallAdminDash";
// import AllHallList from "./Pages/staff/AllHalls";
// import HallReservationForm from "./Pages/staff/HallReservationForm";
// import HallAvailabilty from "./Pages/HallAvailabilty";
// import BookHall from "./Pages/BookHall";
// import HallResources from "./Pages/staff/HallResources";
// import AdminBookHall from "./Pages/staff/AllHallRes";
// import Bug from "./Pages/Bug";
// import HallBookingData from "./Pages/HallBookingData";
// import HallCalender from "./Pages/staff/HallCalender";
// import Alldates from "./Pages/staff/Alldates";
import EditBooking from "./Pages/EditBooking";
import AddItem from "./Pages/Inventory/AddItem";


import DiningDash from "./Pages/Client/restaurant/DiningDash.js";

import AddPayment from "./Pages/addpayment";

//Kitchen Inventory
import AddStock from "./Pages/Staff/KitchenInventory/AddStock.js";
import KitchenInventory from "./Pages/Staff/KitchenInventory/KitchenInventory.js";
import AddBulkStock from "./Pages/Staff/KitchenInventory/AddBulkStock.js";
import BulkStock from "./Pages/Staff/KitchenInventory/BulkStock.js";
import CombinedInventory from "./Pages/Staff/KitchenInventory/CombinedInventory.js";

import EditItem from "./Pages/Inventory/EditItem";
import HotelView from "./Pages/Inventory/HotelView";

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);
const Layout2 = ({ children }) => (
  <div>
    <DiningNavbar />
    {children}
    <Footer />
  </div>
);

const Layout3 = ({ children }) => (
  <div>
    <RestaurantNavbar />
    {children}
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<InitialRedirect />} />
          <Route
            path="/Dashboard"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          {/* client Side */}
          {/* user login */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPwd" element={<ForgotPassword />} />
          <Route path="/user/resetPassword/:token" element={<PasswordReset />} />

          {/* user Management */}
          <Route path="/AdminDashbord" element={<AdminDash />} />
          <Route path="/ManagerDash" element={<ManagerDash />} />
          <Route path="/StaffDashbord" element={<StaffDash />} />
          <Route path="/Staffmanage" element={<Staffmanage />} />
          <Route path="/Usermanage" element={<Usermanage />} />
          <Route path="/Accountmanage" element={<AccountManage />} />

          <Route
            path="/DiningDashboard"
            element={
              <Layout2>
                <DiningDash />
              </Layout2>
            }
          />
          <Route path="/TableReservations" element={<TableReservation />} />
          <Route path="/AddReservations" element={<AddReservation />} />
          <Route path="/menu" element={<MenuItems />} />
          <Route path="/addMenu" element={<AddNewMenu />} />
          <Route path="/updateMenu" element={<UpdateMenu />} />
          <Route path="/displaymenu" element={<MenuByCategoryPage />} />
          <Route
            path="/displayReservations"
            element={<ManageTableReservation />}
          />
          <Route path="/displayOrders" element={<DisplayOrders />} />
          <Route path="/AddOrder" element={<AddNewOrder />} />
          <Route path="/DisplayBuffet" element={<DisplayBuffet />} />
          <Route path="/manageTables" element={<ManageTableReservation />} />
          <Route path="/manageOrders" element={<ManageOrders />} />
          <Route path="/manageBuffet" element={<ManageBuffet />} />
          <Route path="/updateBuffet" element={<UpdateBuffet />} />
          <Route path="/addBuffet" element={<AddBuffet />} />

          <Route path="/Watersports" element={<WatersportActivities />} />
          <Route path="/ManagerDashboard" element={<Dashboard />} />
          <Route path="/reservationNavbar" element={<ReservationNavbar />} />
          <Route path="/AddActivity" element={<AddActivity />} />
          <Route path="/WatersportsManagement" element={<WatersportManage />} />
          <Route path="/addWatersportsReservation" element={<AddReserv />} />
          <Route path="/selectActivity" element={<SelectActivity />} />
          <Route path="/watersportReservations" element={<WatersportReservations />}/>
          <Route path="/PastReservations" element={<PastWatersportReservations />} />
          <Route path="/receptionDashboard" element={<ReceptionDashboard />} />
          <Route path="/DiningReservations" element={<DiningReservations />} />

          <Route
            path="/rooms"
            element={
              <Layout>
                <Room />
              </Layout>
            }
          />
          <Route
            path="/reservation"
            element={
              <Layout>
                {" "}
                <Reservation />
              </Layout>
            }
          />
          <Route
            path="/CustomerDetails"
            element={
              <Layout>
                <Details />
              </Layout>
            }
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/AddRoom" element={<AddRoom />} />
          <Route path="/MyBookings" element={<Mybookings />} />
          <Route path="/ManageRoom" element={<ManageRoom />} />

          <Route path="/RoomManagerView" element={<RoomManagerView />} />
          <Route path="/offerPackage" element={<Offer />} />
          <Route path="/Addoffer" element={<AddNewOffer />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/EditItem" element={<EditItem />} />
          <Route path="/HotelView" element={<HotelView />} />

          <Route path="/AddStock" element={<AddStock />} />
          <Route path="/KitchenInventory" element={<KitchenInventory />} />
          <Route path="/AddPayment" element={<AddPayment />} />
          <Route path="/AddBulkStock" element={<AddBulkStock />} />
          <Route path="/BulkStock" element={<BulkStock />} />
          <Route path="/CombinedInventory" element={<CombinedInventory />} />

          <Route path="/editBooking/:id" element={<EditBooking />} />

          {/* <Route path="/halls" element={<HallList />} />
          <Route path="/ViewHall/:id" element={<ViewHall />} />
          <Route path="/EditHall/:id" element={<EditHall />} />
          <Route path="/HallAdminDash" element={<HallAdminDash />} />
          <Route path="/AllHalls" element={<AllHallList />} /> 
          <Route path="/AddHall/:id" element={<HallReservationForm />} />
          <Route path="/availability" element={<HallAvailabilty />} />
          <Route path="/bookHall" element={<BookHall />} />
          <Route path="/HallResource" element={<HallResources />} />
          <Route path="/AllReservations" element={<AdminBookHall />} />
          <Route path="/bookingdata/:id" element={<HallBookingData />} />
          <Route path="/HallCalender" element={<HallCalender />} />
          <Route path="/alldates" element={<Alldates />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
