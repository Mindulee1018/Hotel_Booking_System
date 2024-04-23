import { useEffect, useState } from "react"

const RoomList = () => {
    const [roomList, setRoomList] = useState([]);
  
    useEffect(() => {
      const fetchRoom = async () => {
        try {
          const response = await fetch("http://localhost:4000/room/getRoom");
          if (!response.ok) {
            throw new Error("Failed to fetch rooms");
          }
          const json = await response.json();
          setRoomList(json);
        } catch (error) {
          console.error("Error fetching rooms data:", error);
        }
      };
      fetchRoom();
    }, []);

    return {roomList};
};

export default RoomList;

