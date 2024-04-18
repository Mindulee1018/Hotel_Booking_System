export const checkActivityAvailability = async (checkinDate, checkinTime) => {
  try {
    const response = await fetch(
      `http://localhost:4000/watersportReservation/getReservations?selectedDate=${checkinDate}&selectedTime=${checkinTime}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }
    const activities = await response.json();
    return activities;
  } catch (error) {
    console.error("Error checking activity availability:", error);

    return false;
  }
};
