import useNotifications from "../../../hooks/Staff/useReadNotifications";
import RoomSideBar from "../../../components/RoomSideBar";

function Notifications() {
  const { Notifications, isLoading, error } = useNotifications();
  console.log(Notifications, "notifications");

  if (isLoading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

  return (
    <div className="row">
      <RoomSideBar />
      <div className="col">
        <h2>Notifications</h2>
        {Notifications && Notifications.length > 0 ? (
          <ul>
            {Notifications.map((notification, index) => (
              <li key={index}>{notification.roomNumbers}</li>
            ))}
          </ul>
        ) : (
          <p>No notifications to display.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
