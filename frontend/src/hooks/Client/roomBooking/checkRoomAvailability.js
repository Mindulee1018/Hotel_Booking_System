export const checkRoomAvailability = async (
  Checkindate,
  Checkoutdate,
  selectedRoomType
) => {
  try {
    const response = await fetch(
      `http://localhost:4000/roomreservation/getAvailableRooms?Checkindate=${Checkindate}&Checkoutdate=${Checkoutdate}&Rtype=${selectedRoomType}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const activities = await response.json();
    return activities;
  } catch (error) {
    console.error("Error checking rooms availability:", error);

    return false;
  }
};
