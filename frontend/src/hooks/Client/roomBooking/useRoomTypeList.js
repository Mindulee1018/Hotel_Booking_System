import { useEffect, useState } from "react"

const RoomTypeList = () => {
    const [roomTypes, setRoomTypes] = useState([]);
  
    useEffect(() => {
      const fetchRoomType = async () => {
        try {
          const response = await fetch("http://localhost:4000/roomType/");
          if (!response.ok) {
            throw new Error("Failed to fetch rooms");
          }
          const json = await response.json();
          setRoomTypes(json);
        } catch (error) {
          console.error("Error fetching rooms data:", error);
        }
      };
      fetchRoomType();
    }, []);

    return {roomTypes};
};

export default RoomTypeList;

