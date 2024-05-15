import React, { useState, useEffect } from "react";
import useNotifications from "../../../hooks/Staff/useReadNotifications";
import InventoryManagerSideBar from "../../../components/InventoryManagerSideBar";
import useDeleteNotification from "../../../hooks/Staff/useDeleteNotifications";

function AlertNotifications() {
  const { Notifications, isLoading, error } = useNotifications();
  console.log(Notifications, "notifications");

  const { deleteNotification } = useDeleteNotification();
  const [idToDelete, setIdToDelete] = useState("");

  const filterEmail = "roommanager@gmail.com";
  const filteredNotifications = Notifications?.filter(
    (notif) => notif.email === filterEmail
  );

  const handleDelete = async () => {
    await deleteNotification(idToDelete);

    setIdToDelete("");
  };

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

  return (
    <div className="row">
      <InventoryManagerSideBar />
      <div className="col">
        <h2>Notifications</h2>
        <table className="justify-content-center">
          <thead>
            <tr>
              <th className="border border-black">Room Number/s</th>
              <th className="border border-black">Message</th>
              <th className="border border-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications && filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification, index) => (
                <tr key={index}>
                  <td className="border border-black">
                    {notification.roomNumbers}
                  </td>
                  <td className="border border-black">
                    {notification.Message}
                  </td>
                  <td className="border border-black">
                    <button className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#Modal"
                    onClick={() =>
                      setIdToDelete(notification._id)
                    }
                    >DONE</button>
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td>No notifications to display.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* model  */}
        <div
              className="modal fade"
              id="Modal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      CAUTION
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    Mark as read?
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <form action="" method="delete">
                      <button
                        className="btn btn-outline-danger"
                        onClick={handleDelete}
                      >
                        Mark as Read
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}

export default AlertNotifications;
