import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

///////////Client Side////////////

//context
import InitialRedirect from "./context/initialDirect";

//components
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiningNavbar from "./components/DiningNavbar";
import ManagerPanel from "./components/RoomManagerNavbar.js";

//User login
import Home from "./Pages/Client/userLogin/Home.js";
import Signup from "./Pages/Client/userLogin/signup.js";
import PasswordReset from "./Pages/Client/userLogin/PasswordReset.js";
import ForgotPassword from "./Pages/Client/userLogin/ForgotPwd.js";
import VerifyEmail from "./Pages/Client/userLogin/VerifyEmail.js";

//Restaurant
import DiningDash from "./Pages/Client/restaurant/DiningDash.js";
import TableReservation from "./Pages/Client/restaurant/TableReservation.js";
import AddReservation from "./Pages/Client/restaurant/AddReservation.js";
import MenuByCategoryPage from "./Pages/Client/restaurant/DisplayMenu.js";
import DisplayOrders from "./Pages/Client/restaurant/DisplayFoodOrders.js";
import AddNewOrder from "./Pages/Client/restaurant/AddOrders.js";
import DisplayBuffet from "./Pages/Client/restaurant/DisplayBuffet.js";
import ManageOrders from "./Pages/Client/restaurant/DisplayOrders.js";

//room
import ReservationDetails from "./Pages/Client/roomBooking/CustomerDetails.js";
import Mybookings from "./Pages/Client/roomBooking/MyBookings.js";
import AddRoomReserve from "./Pages/Client/roomBooking/addRoomReservation.js";

//hall
import AllHallList from "./Pages/Client/HallBooking/AllHalls.js";
import BookHall from "./Pages/Client/HallBooking/BookHall.js";
import EditBooking from "./Pages/Client/HallBooking/EditBooking.js";
import HallAvailability from "../src/Pages/Client/HallBooking/HallAvailabilty.js";
import HallBookingData from "./Pages/Client/HallBooking/HallBookingData.js";
import HallList from "./Pages/Client/HallBooking/HallList.js";
import HallReservationForm from "./Pages/Client/HallBooking/HallReservationForm.js";
import ViewHall from "./Pages/Client/HallBooking/ViewHall.js";

//watersport
import WatersportActivities from "../src/Pages/Client/WatersportActivities.js";

//offers and packages
import Offer from "./Pages/Client/offerPackage.js";





///////////manager side////////////
import ManagerDash from "./Pages/Staff/userManagement/ManagerDash.js";
import Dashboard from "./Pages/Staff/ManagerDashboard";

//reception
import ReceptionDashboard from "./Pages/Staff/Reception/receptionDashboard";
import ReservationNavbar from "./components/reservationNavBar";
import AddReserv from "./Pages/Staff/Reception/addWatersportReserv";
import SelectActivity from "./Pages/Staff/Reception/SelectActivity";
import WatersportReservations from "./Pages/Staff/Reception/watersportReservations";
import PastWatersportReservations from "./Pages/Staff/Reception/pastWatersportReserv";
import DiningReservations from "./Pages/Staff/Reception/DiningReservations.js";
import RoomBookings from "./Pages/Staff/Reception/RoomReservations.js";
import PastRoomBookings from "./Pages/Staff/Reception/pastRoomReservations.js";

//user management
import StaffDash from "./Pages/Staff/userManagement/StaffDash.js";
import AdminDash from "./Pages/Staff/userManagement/AdminDash.js";
import Staffmanage from "./Pages/Staff/userManagement/staffManage.js";
import Usermanage from "./Pages/Staff/userManagement/UserManage.js";
import AccountManage from "./Pages/Staff/userManagement/AccountManage.js";

//restaurant management
import RestaurantNavbar from "./components/RestaurantManagerNavbar";
import MenuItems from "./Pages/Staff/restaurantManager/MenuManagement.js";
import AddNewMenu from "./Pages/Staff/restaurantManager/AddMenu.js";
import UpdateMenu from "./Pages/Staff/restaurantManager/UpdateMenu.js";
import ManageBuffet from "./Pages/Staff/restaurantManager/ManageBuffets.js";
import UpdateBuffet from "./Pages/Staff/restaurantManager/UpdateBuffet.js";
import AddBuffet from "./Pages/Staff/restaurantManager/AddBuffet.js";
import ManageTableReservation from "./Pages/Staff/restaurantManager/TableReserManagement.js";

//room management
import Profile from "./Pages/Staff/roomManager/Profile.js";
import Bookings from "./Pages/Staff/roomManager/Bookings.js";
import AddRoom from "./Pages/Staff/roomManager/AddRoom.js";
import ManageRoom from "./Pages/Staff/roomManager/ManageRoom.js";
import AddNewRoomType from "./Pages/Staff/roomManager/AddRoomType.js";
import Notifications from "./Pages/Staff/roomManager/notifications.js";

//watersport activity management
import AddActivity from "./Pages/Staff/Reception/AddActivity";
import WatersportManage from "./Pages/Staff/ActivityManagement/WatersportManagement.js";

//event management
import Alldates from "../src/Pages/Staff/HallManagement/Alldates.js";
import AdminBookHall from "./Pages/Staff/HallManagement/AllHallRes.js";
import EditHall from "./Pages/Staff/HallManagement/EditHall.js";
import HallAdminDash from "./Pages/Staff/HallManagement/HallAdminDash.js";
import HallCalendar from "./Pages/Staff/HallManagement/HallCalender.js";
import HallResources from "./Pages/Staff/HallManagement/HallResources.js";

import AddPayment from "./Pages/addpayment";

//Kitchen Inventory
import AddStock from "./Pages/Staff/KitchenInventory/AddStock.js";
import KitchenInventory from "./Pages/Staff/KitchenInventory/KitchenInventory.js";
import AddBulkStock from "./Pages/Staff/KitchenInventory/AddBulkStock.js";
import BulkStock from "./Pages/Staff/KitchenInventory/BulkStock.js";
import CombinedInventory from "./Pages/Staff/KitchenInventory/CombinedInventory.js";
import StockDetails from "./Pages/Staff/KitchenInventory/StockDetails.js";
import BStockDetails from "./Pages/Staff/KitchenInventory/BStockDetails.js";

//Room Inventory
import RoomManagerView from "./Pages/Staff/RoomInventory/RoomManagerView";
import AddItem from "./Pages/Staff/RoomInventory/AddItem.js";
import EditItem from "./Pages/Staff/RoomInventory/EditItem.js";
import HotelView from "./Pages/Staff/RoomInventory/HotelView.js";

//offers managemet
import AddNewOffer from "./Pages/Staff/Offers/addOffer.js";






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
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ForgotPwd" element={<ForgotPassword />} />
          <Route path="/user/resetPassword/:token" element={<PasswordReset />}/>
          <Route path="/user/verify/:verifytoken" element={<VerifyEmail />}/>

          {/* waterpost page */}
          <Route path="/Watersports" element={<Layout><WatersportActivities /></Layout>} />

          {/* offers page */}
          <Route path="/offerPackage" element={<Offer />} />

          {/* dining reservations */}
          <Route path="/DiningDashboard" element={<Layout2> <DiningDash /></Layout2>}/>
          <Route path="/TableReservations" element={<Layout2><TableReservation /></Layout2>} />
          <Route path="/AddReservations" element={<AddReservation />} />
          <Route path="/displaymenu" element={<Layout2><MenuByCategoryPage /></Layout2>} />
          <Route path="/displayOrders" element={<Layout2><DisplayOrders /></Layout2>} />
          <Route path="/AddOrder" element={<AddNewOrder />} />
          <Route path="/DisplayBuffet" element={<Layout2><DisplayBuffet /></Layout2>} />
          <Route path="/manageTables" element={<ManageTableReservation />} />
          <Route path="/manageOrders" element={<ManageOrders />} />

          {/* room reservations */}
          <Route path="/CustomerDetails" element={<ReservationDetails />}/>
          <Route path="/roomReservation" element={<Layout><AddRoomReserve /></Layout>} />
          <Route path="/MyBookings" element={<Layout><Mybookings /></Layout>} />

          {/* hall reservations */}
          <Route path="/editBooking/:id" element={<EditBooking />} />
          <Route path="/halls" element={<HallList />} />
          <Route path="/ViewHall/:id" element={<ViewHall />} /> 
          <Route path="/AllHalls" element={<Layout><AllHallList /></Layout>} />
          <Route path="/AddHall/:id" element={<HallReservationForm />} />
          <Route path="/availability" element={<Layout><HallAvailability /></Layout>} />
          <Route path="/bookHall" element={<BookHall />} />
          <Route path="/bookingdata/:id" element={<HallBookingData />} />




          {/* admin side */}

          {/* user Management */}
          <Route path="/AdminDashbord" element={<AdminDash />} />
          <Route path="/ManagerDash" element={<ManagerDash />} />
          <Route path="/StaffDashbord" element={<StaffDash />} />
          <Route path="/Staffmanage" element={<Staffmanage />} />
          <Route path="/Usermanage" element={<Usermanage />} />
          <Route path="/Accountmanage" element={<AccountManage />} />

          {/* reception */}
          <Route path="/ManagerDashboard" element={<Dashboard />} />
          <Route path="/reservationNavbar" element={<ReservationNavbar />} />
          <Route path="/addWatersportsReservation" element={<AddReserv />} />
          <Route path="/selectActivity" element={<SelectActivity />} />
          <Route path="/watersportReservations" element={<WatersportReservations />}/>
          <Route path="/PastReservations" element={<PastWatersportReservations />} />
          <Route path="/receptionDashboard" element={<ReceptionDashboard />} />
          <Route path="/DiningReservations" element={<DiningReservations />} />
          <Route path="/roomBookings" element={<RoomBookings/>} />
          <Route path="/PastRoomBookings" element={<PastRoomBookings/>} />

          {/* restaurant management */}
          <Route path="/menu" element={<MenuItems />} />
          <Route path="/addMenu" element={<AddNewMenu />} />
          <Route path="/updateMenu" element={<UpdateMenu />} />
          <Route path="/manageBuffet" element={<ManageBuffet />} />
          <Route path="/updateBuffet" element={<UpdateBuffet />} />
          <Route path="/addBuffet" element={<AddBuffet />} />
          <Route path="/displayReservations" element={<ManageTableReservation />}/>

          {/* room management */}
          <Route path="/managerPanel" element={<ManagerPanel />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/AddRoom" element={<AddRoom />} />
          <Route path="/ManageRoom" element={<ManageRoom />} />
          <Route path="/addRoomType" element={<AddNewRoomType />} />
          <Route path="/notifications" element={<Notifications />} />


          {/* watersport activity management */}
          <Route path="/AddActivity" element={<AddActivity />} />
          <Route path="/WatersportsManagement" element={<WatersportManage />} />

          {/* event management */}
          <Route path="/HallAdminDash" element={<HallAdminDash />} />
          <Route path="/alldates" element={<Alldates />} />
          <Route path="/AllReservations" element={<AdminBookHall />} />
          <Route path="/EditHall/:id" element={<EditHall />} />
          <Route path="/HallCalender" element={<HallCalendar />} />
          <Route path="/HallResource" element={<HallResources />} />

          {/* Kitchen Inventory */}
          <Route path="/AddStock" element={<AddStock />} />
          <Route path="/KitchenInventory" element={<KitchenInventory />} />
          <Route path="/AddBulkStock" element={<AddBulkStock />} />
          <Route path="/BulkStock" element={<BulkStock />} />
          <Route path="/CombinedInventory" element={<CombinedInventory />} />
          <Route path="/kitchenStock/:stockName" element={<StockDetails />} />
          <Route path="/kitchenBulkStock/:bstockName" element={<BStockDetails />} />

          {/* Room Inventory */}
          <Route path="/RoomManagerView" element={<RoomManagerView />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/EditItem" element={<EditItem />} />
          <Route path="/HotelView" element={<HotelView />} />

          {/* offers managemet */}
          <Route path="/Addoffer" element={<AddNewOffer />} />

       
          <Route path="/AddPayment" element={<AddPayment />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
