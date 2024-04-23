import { useState } from "react";
import { FaUsers, FaUserCog, FaBell } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import Adminsidebar from "../../../components/AdminSidebar";
import useNotificationManager from '../../../hooks/Staff/userManagement/useMulLoginNoti'; // Custom hook for notifications

function AdminDash() {


  // Use the custom hook to manage notifications
  const {
    notifications,
    unreadCount,
    markNotificationsAsRead,
    deleteNotifications
  } = useNotificationManager();

  // State to keep track of selected notifications to mark as read or delete
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Handle selecting/deselecting notifications
  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0 p-0">
        <div className="col-md-2 p-0">
          <Adminsidebar />
        </div>
        <div className="col-md-10">
          <div className="row h4 mb-5" style={{ height: "75px" }}>
            <div>
              <p className="mt-5">Admin Dashboard</p>
              <div
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <FaBell size={30} />
                {unreadCount > 0 && (
                  <span className="badge bg-danger">{unreadCount}</span> // Unread count as badge
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-around h-25">
            <div className="card col-2 pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75">
              <FaUsers size={50} color="white" />
              <a
                className="nav-link mt-5 fs-5 text-white"
                aria-current="page"
                href="/Staffmanage"
              >
                Staff Management
              </a>
            </div>
            <div className="card col-2 pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75">
              <FaUserCog size={50} color="white" />
              <a
                className="nav-link mt-5 fs-5 text-white"
                aria-current="page"
                href="/Usermanage"
              >
                User Management
              </a>
            </div>
            <div className="card col-2 pt-4 d-flex justify-content-center align-items-center bg-dark opacity-75">
              <IoMdSettings size={50} color="white" />
              <a
                className="nav-link mt-5 fs-5 text-white"
                aria-current="page"
                href="/Accountmanage"
              >
                Account Manage
              </a>
            </div>
          </div>
          <hr />

          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%', // Set the width to 100%
              maxWidth: '540px', // Limit the maximum width
              height: '380px',
            }}
            src="https://charts.mongodb.com/charts-project-0-sqqdz/embed/charts?id=660ab80c-c20d-4b70-84cf-523695f27b2a&maxDataAge=60&theme=light&autoRefresh=true"
            title="MongoDB Chart"
          ></iframe>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Notifications
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {notifications.map((notification) => (
                <div key={notification._id} className="d-flex justify-content-between">
                  <div>
                    {notification.message}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification._id)}
                      onChange={() => handleSelectNotification(notification._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => markNotificationsAsRead(selectedNotifications)}
              >
                Mark as Read
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => deleteNotifications(selectedNotifications)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setSelectedNotifications([])} // Reset selected notifications
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
