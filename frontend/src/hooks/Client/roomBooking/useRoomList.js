import { useEffect, useState } from "react"

const RoomList = () => {
    const [rooms, setRoom] = useState([]);
  
    useEffect(() => {
      const fetchRoom = async () => {
        try {
          const response = await fetch("http://localhost:4000/room/getRoom");
          if (!response.ok) {
            throw new Error("Failed to fetch rooms");
          }
          const json = await response.json();
          setRoom(json);
        } catch (error) {
          console.error("Error fetching rooms data:", error);
        }
      };
      fetchRoom();
    }, []);

    return {rooms};
};

export default RoomList;

