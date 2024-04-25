import { useLogout } from "../../hooks/Client/userLogin/useLogout";

function Dashboard() {
  const { logout } = useLogout();

  const handlelogout = () => {
    logout();
  };

  const userEmail = localStorage.getItem("email");
  return (
    <div>
      <div
        className="border border-3 pb-3 mb-4"
        style={{ backgroundColor: " #f8f9fa" }}
      >
        <h3 className="my-5">Welcome to Manager Dashboard!</h3>
        <div className="">
          <a
            href=""
            id="userStatus"
            className="btn"
            sty
            onClick={handlelogout}
            style={{
              backgroundColor: "rgb(85, 180, 254)",
              position: "relative",
              top: "0px",
            }}
          >
            Logout
          </a>
        </div>
      </div>

      <div
        className="d-grid gap-4 col-3 mx-auto"
        
      >
        <a
          href={
            userEmail && userEmail.includes("roommanager") ? "/Bookings" : "#"
          }
          className={`btn btn-outline-primary mb-3 lh-lg fs-5 ${
            userEmail && userEmail.includes("roommanager") ? "" : "disabled"
          }`}
          type="button"
        >
          Room Manager
        </a>
        <a
          href={
            userEmail && userEmail.includes("restaurantmanager") ? "/menu" : "#"
          }
          className={`btn btn-outline-primary mb-3 lh-lg fs-5 ${
            userEmail && userEmail.includes("restaurantmanager")
              ? ""
              : "disabled"
          }`}
          type="button"
        >
          Restaurant Manager
        </a>
        <a
          href={
            userEmail
              ? userEmail.includes("activitymanager")
                ? "/receptionDashboard"
                : userEmail.includes("eventmanager")
                ? "/HallAdminDash"
                : "#"
              : "#"
          }
          className={`btn btn-outline-primary mb-3 lh-lg fs-5 ${
            userEmail &&
            (userEmail.includes("eventmanager") ||
              userEmail.includes("activitymanager"))
              ? ""
              : "disabled"
          }`}
          type="button"
        >
          Event & Activity Manager
        </a>
        
        <a
          href={
            userEmail && userEmail.includes("inventorymanager")
              ? "RoomManagerView"
              : "#"
          }
          className={`btn btn-outline-primary mb-3 lh-lg fs-5 ${
            userEmail && userEmail.includes("inventorymanager")
              ? ""
              : "disabled"
          }`}
          type="button"
        >
          Room Inventory Manager
        </a>
        <a
          href={
            userEmail && userEmail.includes("kitchenmanager")
              ? "/CombinedInventory"
              : "#"
          }
          className={`btn btn-outline-primary mb-3 lh-lg fs-5 ${
            userEmail && userEmail.includes("kitchenmanager") ? "" : "disabled"
          }`}
          type="button"
        >
          Kitchen Inventory Manager
        </a>
      </div>
      <div></div>
    </div>
  );
}

export default Dashboard;
